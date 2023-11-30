/**
 * Test iTunesProvider sagas
 */

import { takeLatest, call, put } from 'redux-saga/effects';
import { apiResponseGenerator } from '@app/utils/testUtils';
import { getTracks } from '@app/services/itunesApi';
import iTunesProviderSaga, { getAllTracks } from '../saga';
import { iTunesProviderTypes } from '../reducer';

describe('ITunesProvider saga tests', () => {
  const generator = iTunesProviderSaga();
  const searchTerm = 'ignite';
  let getAllTracksGenerator = getAllTracks({ searchTerm });

  it('should start task to watch for REQUEST_GET_TRACKS action', () => {
    expect(generator.next().value).toEqual(takeLatest(iTunesProviderTypes.REQUEST_GET_TRACKS, getAllTracks));
  });

  it('should dispatch SUCCESS_GET_TRACKS action if API call succeeds', () => {
    const response = getAllTracksGenerator.next().value;
    expect(response).toEqual(call(getTracks, searchTerm));

    const apiResponse = {
      resultCount: 1,
      results: [{ trackId: 12345, trackName: 'ignite' }]
    };

    expect(getAllTracksGenerator.next(apiResponseGenerator(true, apiResponse)).value).toEqual(
      put({
        type: iTunesProviderTypes.SUCCESS_GET_TRACKS,
        tracks: {
          ...apiResponse,
          results: { 12345: { trackId: 12345, trackName: 'ignite' } }
        }
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
        type: iTunesProviderTypes.FAILURE_GET_TRACKS,
        error: errorMsg
      })
    );
  });
});
