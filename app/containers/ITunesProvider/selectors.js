// import { createSelector } from 'reselect';
// import { initialState } from './reducer';

/**
 * Direct selector to the iTunesProvider state domain
 */

// const selectITunesProviderDomain = state => state.iTunesProvider || initialState;

// export const selectITunesProvider = () =>
//   createSelector(selectITunesProviderDomain, substate => substate);

// export const selectSomePayLoad = () =>
//   createSelector(selectITunesProviderDomain, substate => substate.somePayLoad);

import { createSelector } from 'reselect';
import get from 'lodash/get';
import { initialState } from './reducer';

/**
 * Direct selector to the iTunesProvider state domain
 */

export const selectITunesProviderDomain = (state) => state.iTunes || initialState;

export const selectITunes = () => createSelector(selectITunesProviderDomain, (substate) => substate);

export const selectTracks = () => createSelector(selectITunesProviderDomain, (substate) => get(substate, 'tracks'));

export const selectError = () => createSelector(selectITunesProviderDomain, (substate) => get(substate, 'error'));

export const selectTrackById = (trackId) =>
  createSelector(selectITunesProviderDomain, (substate) => get(substate, `tracks.results[${trackId}]`));
