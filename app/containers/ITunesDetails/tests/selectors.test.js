import { selectITunesDetails, selectSongDetails, selectError } from '@app/containers/ITunesDetails/selectors';

describe('ITunesDetails selector tests', () => {
  const mockedState = {
    iTunesDetails: {
      trackId: '123456789',
      songDetails: { trackName: 'test' },
      error: { errorMessage: 'Invalid request' }
    }
  };

  it('should select the iTunesDeatails state', () => {
    const iTunesDetailsSelector = selectITunesDetails();
    expect(iTunesDetailsSelector(mockedState)).toEqual(mockedState.iTunesDetails);
  });

  it('should select the songDetails state', () => {
    const resultsSelector = selectSongDetails();
    expect(resultsSelector(mockedState)).toEqual(mockedState.iTunesDetails.songDetails);
  });

  it('should select the error state', () => {
    const errorSelector = selectError();
    expect(errorSelector(mockedState)).toEqual(mockedState.iTunesDetails.error);
  });
});
