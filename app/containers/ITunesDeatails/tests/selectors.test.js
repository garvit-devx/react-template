import { selectITunesDeatails, selectResults, selectError } from '../selectors';

describe('ITunesDetails selector tests', () => {
  const mockedState = {
    iTunesDeatails: {
      trackId: '123456789',
      results: { resultCount: 1, results: [{ trackName: 'test' }] },
      error: { errorMessage: 'Invalid request' }
    }
  };

  it('should select the iTunesDeatails state', () => {
    const iTunesDeatailsSelector = selectITunesDeatails();
    expect(iTunesDeatailsSelector(mockedState)).toEqual(mockedState.iTunesDeatails);
  });

  it('should select the somePayLoad state', () => {
    const resultsSelector = selectResults();
    expect(resultsSelector(mockedState)).toEqual(mockedState.iTunesDeatails.results);
  });

  it('should select the error state', () => {
    const errorSelector = selectError();
    expect(errorSelector(mockedState)).toEqual(mockedState.iTunesDeatails.error);
  });
});
