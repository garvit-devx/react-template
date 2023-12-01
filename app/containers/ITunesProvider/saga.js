import { takeLatest, call, put } from 'redux-saga/effects';
import { iTunesProviderTypes, iTunesProviderCreators } from './reducer';
import { getTracks } from '@app/services/itunesApi';

const { REQUEST_GET_TRACKS } = iTunesProviderTypes;
const { successGetTracks, failureGetTracks } = iTunesProviderCreators;

export function* getAllTracks(action) {
  try {
    const response = yield call(getTracks, action.searchTerm);
    const { data, ok } = response;
    if (ok) {
      const transformedResults = {};
      data.results.forEach((item) => {
        transformedResults[item.trackId] = item;
      });
      yield put(successGetTracks({ ...data, results: transformedResults }));
    } else {
      throw new Error(data);
    }
  } catch (error) {
    yield put(failureGetTracks(error));
  }
}

// Individual exports for testing
export default function* iTunesProviderSaga() {
  yield takeLatest(REQUEST_GET_TRACKS, getAllTracks);
}
