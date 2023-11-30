import { iTunesProviderReducer, iTunesProviderTypes, initialState } from '../reducer';

describe('ITunesProvider reducer tests', () => {
  it('should return the initial state by default', () => {
    expect(iTunesProviderReducer(undefined, {})).toEqual(initialState);
  });

  it('should return updated state when an action of type REQUEST_GET_TRACKS is dispatched', () => {
    const expectedResult = { ...initialState, searchTerm: 'ignite' };

    expect(
      iTunesProviderReducer(initialState, {
        type: iTunesProviderTypes.REQUEST_GET_TRACKS,
        searchTerm: 'ignite'
      })
    ).toEqual(expectedResult);
  });

  it('should return the updated state when an action of type SUCCESS_GET_TRACKS is dispatched', () => {
    const expectedResult = {
      ...initialState,
      tracks: { resultCount: 1, results: { 12345: { trackId: 12345, trackName: 'Ignite' } } }
    };
    expect(
      iTunesProviderReducer(initialState, {
        type: iTunesProviderTypes.SUCCESS_GET_TRACKS,
        tracks: { resultCount: 1, results: { 12345: { trackId: 12345, trackName: 'Ignite' } } }
      })
    ).toEqual(expectedResult);
  });

  it('should return the updated state when an action of type FAILURE_GET_TRACKS is dispatched', () => {
    const expectedResult = { ...initialState, error: { errorMessage: 'Invalid request' } };
    expect(
      iTunesProviderReducer(initialState, {
        type: iTunesProviderTypes.FAILURE_GET_TRACKS,
        error: { errorMessage: 'Invalid request' }
      })
    ).toEqual(expectedResult);
  });
});
