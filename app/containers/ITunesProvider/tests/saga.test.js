/**
 * Test iTunesProvider sagas
 */

import { takeLatest } from 'redux-saga/effects';
import iTunesProviderSaga, { getAllTracks } from '../saga';
import { iTunesProviderTypes } from '../reducer';

describe('ITunesProvider saga tests', () => {
  const generator = iTunesProviderSaga();

  it('should start task to watch for REQUEST_GET_TRACKS action', () => {
    expect(generator.next().value).toEqual(takeLatest(iTunesProviderTypes.REQUEST_GET_TRACKS, getAllTracks));
  });
});
