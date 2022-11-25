import { UserNameByIdPipe } from './user-name-by-id.pipe';

describe('UserNameByIdPipe', () => {
  it('create an instance', () => {
    const pipe = new UserNameByIdPipe();
    expect(pipe).toBeTruthy();
  });
});
