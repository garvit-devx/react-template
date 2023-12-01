/**
 * Test iTunesDeatails sagas
 */

import { takeLatest, call, put } from 'redux-saga/effects';
import { getTrackDetails } from '@app/services/itunesApi';
import { apiResponseGenerator } from '@app/utils/testUtils';
import iTunesDeatailsSaga, { getDetails } from '../saga';
import { iTunesDetailsTypes } from '../reducer';

describe('ITunesDeatails saga tests', () => {
  const generator = iTunesDeatailsSaga();
  const trackId = 12345;
  let getDetailsGenerator = getDetails({ trackId });

  it('should start task to watch for GET_TRACK_DETAILS action', () => {
    expect(generator.next().value).toEqual(takeLatest(iTunesDetailsTypes.GET_TRACK_DETAILS, getDetails));
  });

  it('should dispatch SUCCESS_GET_TRACK_DETAILS and FAILURE_GET_TRACK_DETAILS actions if API call succeeds', () => {
    const res = getDetailsGenerator.next().value;
    expect(res).toEqual(call(getTrackDetails, trackId));

    const apiResponse = {
      resultCount: 1,
      results: [{ trackId: 12345, trackName: 'ignite' }]
    };

    expect(getDetailsGenerator.next(apiResponseGenerator(true, apiResponse)).value).toEqual(
      put({
        type: iTunesDetailsTypes.SUCCESS_GET_TRACK_DETAILS,
        results: apiResponse
      })
    );

    expect(getDetailsGenerator.next(apiResponseGenerator(true, null)).value).toEqual(
      put({
        type: iTunesDetailsTypes.FAILURE_GET_TRACK_DETAILS,
        error: null
      })
    );
  });

  it('should dispatch GET_FAILURE_TRACK_DETAILS action if API call fails', () => {
    getDetailsGenerator = getDetails({ trackId });
    const res = getDetailsGenerator.next().value;
    expect(res).toEqual(call(getTrackDetails, trackId));

    const errorMsg = new Error('Something went wrong');

    expect(getDetailsGenerator.next(apiResponseGenerator(false, errorMsg)).value).toEqual(
      put({
        type: iTunesDetailsTypes.FAILURE_GET_TRACK_DETAILS,
        error: errorMsg
      })
    );
  });
});
