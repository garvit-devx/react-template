import { takeLatest, call, put } from 'redux-saga/effects';
import { getTrackDetails } from '@app/services/itunesApi';
import { iTunesDeatailsTypes, iTunesDeatailsCreators } from './reducer';

// Individual exports for testing
const { GET_TRACK_DETAILS } = iTunesDeatailsTypes;
const { successGetTrackDetails, failureGetTrackDetails } = iTunesDeatailsCreators;

export function* getDetails(action) {
  const response = yield call(getTrackDetails, action.trackId);
  const { data, ok } = response;
  if (ok) {
    yield put(successGetTrackDetails(data));
    yield put(failureGetTrackDetails(null));
  } else {
    yield put(failureGetTrackDetails(data));
  }
}

export default function* iTunesDeatailsSaga() {
  yield takeLatest(GET_TRACK_DETAILS, getDetails);
}
