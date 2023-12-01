import { selectITunesDetails, selectResults, selectError } from '../selectors';

describe('ITunesDetails selector tests', () => {
  const mockedState = {
    iTunesDetails: {
      trackId: '123456789',
      results: { resultCount: 1, results: [{ trackName: 'test' }] },
      error: { errorMessage: 'Invalid request' }
    }
  };

  it('should select the iTunesDeatails state', () => {
    const iTunesDetailsSelector = selectITunesDetails();
    expect(iTunesDetailsSelector(mockedState)).toEqual(mockedState.iTunesDetails);
  });

  it('should select the results state', () => {
    const resultsSelector = selectResults();
    expect(resultsSelector(mockedState)).toEqual(mockedState.iTunesDetails.results);
  });

  it('should select the error state', () => {
    const errorSelector = selectError();
    expect(errorSelector(mockedState)).toEqual(mockedState.iTunesDetails.error);
  });
});
