/**
 * Test iTunesProvider sagas
 */

import { takeLatest } from 'redux-saga/effects';
import iTunesProviderSaga, { defaultFunction } from '../saga';
import { iTunesProviderTypes } from '../reducer';

describe.skip('ITunesProvider saga tests', () => {
  const generator = iTunesProviderSaga();

  it('should start task to watch for DEFAULT_ACTION action', () => {
    expect(generator.next().value).toEqual(takeLatest(iTunesProviderTypes.DEFAULT_ACTION, defaultFunction));
  });
});
