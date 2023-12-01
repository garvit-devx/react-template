import { iTunesDeatailsReducer, iTunesDeatailsTypes, initialState } from '../reducer';

describe.skip('ITunesDeatails reducer tests', () => {
  it('should return the initial state by default', () => {
    expect(iTunesDeatailsReducer(undefined, {})).toEqual(initialState);
  });

  it('should return the updated state when an action of type DEFAULT is dispatched', () => {
    const expectedResult = { ...initialState, somePayLoad: 'Mohammed Ali Chherawalla' };
    expect(
      iTunesDeatailsReducer(initialState, {
        type: iTunesDeatailsTypes.DEFAULT_ACTION,
        somePayLoad: 'Mohammed Ali Chherawalla'
      })
    ).toEqual(expectedResult);
  });
});
