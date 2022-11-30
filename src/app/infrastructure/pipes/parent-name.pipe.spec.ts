import { ParentNamePipe } from './parent-name.pipe';

describe('ParentNamePipe', () => {
  it('create an instance', () => {
    const pipe = new ParentNamePipe();
    expect(pipe).toBeTruthy();
  });
});
