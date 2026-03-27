import { Component, computed, effect, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Seat } from '../../shared/seat/seat';
import { Movie } from '../../models/movie';
import { Schedule } from '../../models/schedule';
import { SeatsType } from '../../shared/seats-type/seats-type';
import { MovieBuy } from '../../shared/movie-buy/movie-buy';
import { MovieService } from '../../service/movie-service';
import { ScheduleService } from '../../service/schedule-service';
import { EstablishmentFilter } from '../../shared/establishment-filter/establishment-filter';
import { DateFilter } from '../../shared/date-filter/date-filter';
import { RoomFilter } from '../../shared/room-filter/room-filter';
import { FilterService } from '../../service/filter-service';

export interface SeatNumber {
  row: string;
  number: number;
}

interface SeatType {
  type: 'normal' | 'disabled' | 'selected' | 'special';
  text: string;
}

@Component({
  selector: 'app-bookings',
  imports: [Seat, SeatsType, MovieBuy, EstablishmentFilter, DateFilter, RoomFilter],
  templateUrl: './bookings.html',
  styleUrl: './bookings.css',
})
export class Bookings {
  private route = inject(ActivatedRoute);
  private movieService = inject(MovieService);
  private scheduleService = inject(ScheduleService);
  protected filterService = inject(FilterService);

  currentMonth = computed(() => {
    const selected = this.filterService.selectedDate();
    if (!selected) return '';
    const date = new Date(selected + 'T00:00:00');
    const monthNames = [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
    ];
    return monthNames[date.getMonth()];
  });

  rows: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  seatsPerRow: number = 10;
  seats: SeatNumber[] = [];
  selectedSeats: SeatNumber[] = [];

  movie = signal<Movie | null>(null);
  movieId = signal<number | null>(null);
  allSchedules = signal<Schedule[]>([]);
  selectedSchedule = signal<Schedule | null>(null);
  selectedRoom = signal<number | null>(null);

  schedulesForDate = computed(() => {
    const schedules = this.allSchedules();
    const selectedDate = this.filterService.selectedDate();
    if (!selectedDate || schedules.length === 0) return [];

    return schedules.filter((s) => {
      const scheduleDate = new Date(s.date);
      const y = scheduleDate.getUTCFullYear();
      const m = String(scheduleDate.getMonth() + 1).padStart(2, '0');
      const d = String(scheduleDate.getDate()).padStart(2, '0');
      return `${y}-${m}-${d}` === selectedDate;
    });
  });

  uniqueRooms = computed(() => {
    const schedules = this.schedulesForDate();
    const roomMap = new Map<number, string>();
    for (const s of schedules) {
      if (!roomMap.has(s.room)) {
        roomMap.set(s.room, s.type);
      }
    }
    return Array.from(roomMap.entries()).map(([room, type]) => ({ room, type }));
  });

  schedulesForRoom = computed(() => {
    const schedules = this.schedulesForDate();
    const room = this.selectedRoom();
    if (room === null) return schedules;
    return schedules.filter((s) => s.room === room);
  });

  occupiedSeats = computed(() => {
    const schedule = this.selectedSchedule();
    if (!schedule) return new Set<string>();
    const set = new Set<string>();
    for (const seat of schedule.occupiedList) {
      set.add(`${seat.fila}-${seat.columna}`);
    }
    return set;
  });

  seatsType: SeatType[] = [
    { type: 'normal', text: 'Disponible' },
    { type: 'disabled', text: 'Ocupado' },
    { type: 'selected', text: 'Seleccionado' },
    { type: 'special', text: 'VIP' },
  ];

  constructor() {
    effect(() => {
      const establishment = this.filterService.selectedEstablishment();
      const mId = this.movieId();
      if (establishment && mId) {
        this.loadSchedules(establishment.id, mId);
      }
    });

    effect(() => {
      const rooms = this.uniqueRooms();
      if (rooms.length > 0) {
        const current = this.selectedRoom();
        if (current === null || !rooms.find((r) => r.room === current)) {
          this.selectedRoom.set(rooms[0].room);
        }
      } else {
        this.selectedRoom.set(null);
      }
    });

    effect(() => {
      const schedulesForRoom = this.schedulesForRoom();
      const current = this.selectedSchedule();
      if (schedulesForRoom.length > 0) {
        if (!current || !schedulesForRoom.find((s) => s.id === current.id)) {
          this.selectedSchedule.set(schedulesForRoom[0]);
        }
      } else {
        this.selectedSchedule.set(null);
      }
      this.selectedSeats = [];
    });
  }

  private async loadSchedules(sId: number, mId: number) {
    const schedules = await this.scheduleService.getSchedulesByStablishment(sId, mId);
    console.log('Schedules from API:', schedules);
    this.allSchedules.set(schedules);
  }

  selectRoom(room: number) {
    this.selectedRoom.set(room);
    this.selectedSeats = [];
  }

  onScheduleSelected(schedule: Schedule) {
    this.selectedSchedule.set(schedule);
    this.selectedSeats = [];
  }

  toggleSeat(newSeat: SeatNumber) {
    if (this.isSeatOccupied(newSeat)) return;

    const index = this.selectedSeats.findIndex(
      (seat) => seat.row === newSeat.row && seat.number === newSeat.number,
    );

    if (index === -1) this.selectedSeats.push(newSeat);
    else this.selectedSeats.splice(index, 1);
  }

  isSeatSelected(seat: SeatNumber): boolean {
    return this.selectedSeats.some((s) => s.number === seat.number && s.row === seat.row);
  }

  isSeatOccupied(seat: SeatNumber): boolean {
    return this.occupiedSeats().has(`${seat.row}-${seat.number}`);
  }

  deSelectSeat(seatSelected: SeatNumber) {
    const index = this.selectedSeats.findIndex(
      (seat) => seat.row === seatSelected.row && seat.number === seatSelected.number,
    );
    this.selectedSeats.splice(index, 1);
  }

  ngOnInit() {
    for (let row of this.rows) {
      for (let number = 1; number <= this.seatsPerRow; number++) {
        this.seats.push({ row, number });
      }
    }

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.movieId.set(parseInt(id));
      this.movieService.getMovieById(parseInt(id)).subscribe((movie) => {
        this.movie.set(movie);
      });
    }
  }
}
