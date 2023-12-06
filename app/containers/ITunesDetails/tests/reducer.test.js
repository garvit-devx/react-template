import { iTunesDetailsReducer, iTunesDetailsTypes, initialState } from '@app/containers/ITunesDetails/reducer';

describe('ITunesDetails reducer tests', () => {
  it('should return the initial state by default', () => {
    expect(iTunesDetailsReducer(undefined, {})).toEqual(initialState);
  });

  it('should return the updated state when an action of type GET_TRACK_DETAILS is dispatched', () => {
    const expectedResult = { ...initialState, trackId: '12345' };
    expect(
      iTunesDetailsReducer(initialState, {
        type: iTunesDetailsTypes.GET_TRACK_DETAILS,
        trackId: '12345'
      })
    ).toEqual(expectedResult);
  });

  it('should return the updated state when an action of type SUCCESS_GET_TRACK_DETAILS is dispatched', () => {
    const expectedResult = { ...initialState, songDetails: { trackId: '12345' } };

    expect(
      iTunesDetailsReducer(initialState, {
        type: iTunesDetailsTypes.SUCCESS_GET_TRACK_DETAILS,
        songDetails: { trackId: '12345' }
      })
    ).toEqual(expectedResult);
  });

  it('should return the updated state when an action of type FAILURE_GET_TRACK_DETAILS is dispatched', () => {
    const expectedResult = { ...initialState, error: { errorMessage: 'Invalid request' } };

    expect(
      iTunesDetailsReducer(initialState, {
        type: iTunesDetailsTypes.FAILURE_GET_TRACK_DETAILS,
        error: { errorMessage: 'Invalid request' }
      })
    ).toEqual(expectedResult);
  });
});
