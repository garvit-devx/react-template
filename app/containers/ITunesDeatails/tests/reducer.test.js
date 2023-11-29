import { iTunesDeatailsReducer, iTunesDeatailsTypes, initialState } from '../reducer';

describe('ITunesDetails reducer tests', () => {
  it('should return the initial state by default', () => {
    expect(iTunesDeatailsReducer(undefined, {})).toEqual(initialState);
  });

  it('should return the updated state when an action of type GET_TRACK_DETAILS is dispatched', () => {
    const expectedResult = { ...initialState, trackId: '12345' };
    expect(
      iTunesDeatailsReducer(initialState, {
        type: iTunesDeatailsTypes.GET_TRACK_DETAILS,
        trackId: '12345'
      })
    ).toEqual(expectedResult);
  });

  it('should return the updated state when an action of type SUCCESS_GET_TRACK_DETAILS is dispatched', () => {
    const expectedResult = { ...initialState, results: { resultCount: 1, results: [{ trackId: '12345' }] } };

    expect(
      iTunesDeatailsReducer(initialState, {
        type: iTunesDeatailsTypes.SUCCESS_GET_TRACK_DETAILS,
        results: { resultCount: 1, results: [{ trackId: '12345' }] }
      })
    ).toEqual(expectedResult);
  });

  it('should return the updated state when an action of type FAILURE_GET_TRACK_DETAILS is dispatched', () => {
    const expectedResult = { ...initialState, error: { errorMessage: 'Invalid request' } };

    expect(
      iTunesDeatailsReducer(initialState, {
        type: iTunesDeatailsTypes.FAILURE_GET_TRACK_DETAILS,
        error: { errorMessage: 'Invalid request' }
      })
    ).toEqual(expectedResult);
  });
});
