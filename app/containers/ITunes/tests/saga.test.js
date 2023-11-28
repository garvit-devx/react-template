/**
 * Test iTunes sagas
 */

import { takeLatest, call, put } from 'redux-saga/effects';
import { apiResponseGenerator } from '@app/utils/testUtils';
import { getTracks } from '@app/services/itunesApi';
import iTunesSaga, { getAllTracks } from '../saga';
import { iTunesTypes } from '../reducer';

describe('ITunes saga tests', () => {
  const generator = iTunesSaga();
  const searchTerm = 'ignite';
  let getAllTracksGenerator = getAllTracks({ searchTerm });

  it('should start task to watch for REQUEST_GET_TRACKS action', () => {
    expect(generator.next().value).toEqual(takeLatest(iTunesTypes.REQUEST_GET_TRACKS, getAllTracks));
  });

  it('should dispatch SUCCESS_GET_TRACKS action if API call succeeds', () => {
    const response = getAllTracksGenerator.next().value;
    expect(response).toEqual(call(getTracks, searchTerm));

    const apiResponse = {
      resultsCount: 1,
      results: [{ trackName: 'ignite' }]
    };

    expect(getAllTracksGenerator.next(apiResponseGenerator(true, apiResponse)).value).toEqual(
      put({
        type: iTunesTypes.SUCCESS_GET_TRACKS,
        tracks: apiResponse
      })
    );
  });

  it('should dispatch FAILURE_GET_TRACKS action if API call fails', () => {
    getAllTracksGenerator = getAllTracks({ searchTerm });
    const response = getAllTracksGenerator.next().value;
    expect(response).toEqual(call(getTracks, searchTerm));

    const errorMsg = new Error('Something went wrong');

    expect(getAllTracksGenerator.next(apiResponseGenerator(false, 'Something went wrong')).value).toEqual(
      put({
        type: iTunesTypes.FAILURE_GET_TRACKS,
        error: errorMsg
      })
    );
  });
});
