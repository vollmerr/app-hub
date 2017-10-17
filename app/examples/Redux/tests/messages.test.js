import messages from '../messages';


describe('messages', () => {
  it('should contain a header that is a string', () => {
    expect(messages).toHaveProperty('header');
    expect(messages.header).toEqual(expect.stringMatching(/.+/));
  });

  it('should contain a desc that is an array of strings', () => {
    expect(messages).toHaveProperty('desc');

    const arrayOfStrings = expect.arrayContaining([expect.stringMatching(/.+/)]);
    expect(messages.desc).toEqual(arrayOfStrings);
  });
});
