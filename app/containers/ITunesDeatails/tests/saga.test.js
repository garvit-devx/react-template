/**
 * Test iTunesDeatails sagas
 */

import { takeLatest, call } from 'redux-saga/effects';
import iTunesDeatailsSaga, { getDetails } from '../saga';
import { iTunesDeatailsTypes } from '../reducer';
import { getTrackDetails } from '@app/services/itunesApi';

describe('ITunesDeatails saga tests', () => {
  const generator = iTunesDeatailsSaga();
  const trackId = 12345;
  let getDetailsGenerator = getDetails({ trackId });

  it('should start task to watch for GET_TRACK_DETAILS action', () => {
    expect(generator.next().value).toEqual(takeLatest(iTunesDeatailsTypes.GET_TRACK_DETAILS, getDetails));
  });

  it('should dispatch GET_SUCCESS_TRACK_DETAILS action if API call succeeds', () => {
    const res = getDetailsGenerator.next().value;
    expect(res).toEqual(call(getTrackDetails, trackId));
  });
});
