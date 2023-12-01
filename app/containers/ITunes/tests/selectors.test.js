import { selectITunesProviderDomain, selectTracks, selectError, selectITunes } from '../../ITunesProvider/selectors';
import { initialState } from '../../ITunesProvider/reducer';

describe('ITunes selector tests', () => {
  const mockedState = {
    iTunes: {}
  };

  let searchTerm;
  let tracks;
  let error;

  beforeEach(() => {
    (searchTerm = 'ignite'),
      (tracks = { resultCount: 1, results: [{ trackName: searchTerm }] }),
      (error = 'Something went wrong');

    mockedState.iTunes = {
      searchTerm,
      error,
      tracks
    };
  });

  it('should select the iTunes state', () => {
    const iTunesSelector = selectITunes();
    expect(iTunesSelector(mockedState)).toEqual(mockedState.iTunes);
  });

  it('should select the tracks state', () => {
    const tracksSelector = selectTracks();
    expect(tracksSelector(mockedState)).toEqual(mockedState.iTunes.tracks);
  });

  it('should select the error state', () => {
    const errorSelector = selectError();
    expect(errorSelector(mockedState)).toEqual(mockedState.iTunes.error);
  });

  it('should return the global state', () => {
    const selector = selectITunesProviderDomain(initialState);
    expect(selector).toEqual(initialState);
  });
});
