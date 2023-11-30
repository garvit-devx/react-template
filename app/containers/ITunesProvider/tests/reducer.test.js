import { iTunesProviderReducer, iTunesProviderTypes, initialState } from '../reducer';

describe.skip('ITunesProvider reducer tests', () => {
  it('should return the initial state by default', () => {
    expect(iTunesProviderReducer(undefined, {})).toEqual(initialState);
  });

  it('should return the updated state when an action of type DEFAULT is dispatched', () => {
    const expectedResult = { ...initialState, somePayLoad: 'Mohammed Ali Chherawalla' };
    expect(
      iTunesProviderReducer(initialState, {
        type: iTunesProviderTypes.DEFAULT_ACTION,
        somePayLoad: 'Mohammed Ali Chherawalla'
      })
    ).toEqual(expectedResult);
  });
});
