/**
 * Test iTunesDeatails sagas
 */

import { takeLatest } from 'redux-saga/effects';
import iTunesDeatailsSaga, { defaultFunction } from '../saga';
import { iTunesDeatailsTypes } from '../reducer';

describe.skip('ITunesDeatails saga tests', () => {
  const generator = iTunesDeatailsSaga();

  it('should start task to watch for DEFAULT_ACTION action', () => {
    expect(generator.next().value).toEqual(takeLatest(iTunesDeatailsTypes.DEFAULT_ACTION, defaultFunction));
  });
});
