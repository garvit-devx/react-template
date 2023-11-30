import { selectITunes, selectError, selectTracks, selectTrackById } from '../selectors';

describe('ITunesProvider selector tests', () => {
  const mockedState = {
    iTunes: {
      searchTerm: 'ignite',
      tracks: { results: { 12345: { trackId: 12345, trackName: 'ignite' } }, resultCount: 1 },
      error: null
    }
  };

  it('should select the iTunesProvider state', () => {
    const iTunesProviderSelector = selectITunes();
    expect(iTunesProviderSelector(mockedState)).toEqual(mockedState.iTunes);
  });

  it('should select the tracks state', () => {
    const tracksSelector = selectTracks();
    expect(tracksSelector(mockedState)).toEqual(mockedState.iTunes.tracks);
  });

  it('should select the error state', () => {
    const errorSelector = selectError();
    expect(errorSelector(mockedState)).toEqual(mockedState.iTunes.error);
  });

  it('should select the track by id', () => {
    const trackByIdSelector = selectTrackById(12345);
    expect(trackByIdSelector(mockedState)).toEqual(mockedState.iTunes.tracks.results[12345]);
  });
});
