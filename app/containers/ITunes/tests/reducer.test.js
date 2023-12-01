import { iTunesProviderReducer, iTunesProviderTypes, initialState } from '../../ITunesProvider/reducer';

describe('ITunes reducer tests', () => {
  it('should return the initial state by default', () => {
    expect(iTunesProviderReducer(undefined, {})).toEqual(initialState);
  });

  it('should return the updated state when an action of type REQUEST_GET_TRACKS is dispatched', () => {
    const expectedResult = { ...initialState, searchTerm: 'ignite' };
    expect(
      iTunesProviderReducer(initialState, {
        type: iTunesProviderTypes.REQUEST_GET_TRACKS,
        searchTerm: 'ignite'
      })
    ).toEqual(expectedResult);
  });

  it('should return the updated state when an action of type SUCCESS_GET_TRACKS is dispatched', () => {
    const apiResponse = { resultCount: 1, results: [{ trackName: 'ignite' }] };
    const expectedResult = { ...initialState, tracks: apiResponse };

    expect(
      iTunesProviderReducer(initialState, {
        type: iTunesProviderTypes.SUCCESS_GET_TRACKS,
        tracks: apiResponse
      })
    ).toEqual(expectedResult);
  });

  it('should return the updated state when an action of type FAILURE_GET_TRACKS is dispatched', () => {
    const error = 'Something went wrong';
    const expectedResult = { ...initialState, error };

    expect(
      iTunesProviderReducer(initialState, {
        type: iTunesProviderTypes.FAILURE_GET_TRACKS,
        error
      })
    ).toEqual(expectedResult);
  });
});
