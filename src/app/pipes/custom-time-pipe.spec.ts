import { CustomTimePipe } from './custom-time-pipe';

describe('CustomTimePipePipe', () => {
  it('create an instance', () => {
    const pipe = new CustomTimePipe();
    expect(pipe).toBeTruthy();
  });
});
