import { takeLatest, call, put } from 'redux-saga/effects';
import { getTrackDetails } from '@app/services/itunesApi';
import { iTunesDetailsTypes, iTunesDetailsCreators } from './reducer';

// Individual exports for testing
const { GET_TRACK_DETAILS } = iTunesDetailsTypes;
const { successGetTrackDetails, failureGetTrackDetails } = iTunesDetailsCreators;

export function* getDetails(action) {
  const response = yield call(getTrackDetails, action.trackId);
  const { data, ok } = response;
  if (ok) {
    yield put(successGetTrackDetails(data.results[0]));
    yield put(failureGetTrackDetails(null));
  } else {
    yield put(failureGetTrackDetails(data));
  }
}

export default function* iTunesDetailsSaga() {
  yield takeLatest(GET_TRACK_DETAILS, getDetails);
}
