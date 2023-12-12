/**
 * Direct selector to the iTunesProvider state domain
 */

import { createSelector } from 'reselect';
import get from 'lodash/get';
import { initialState } from './reducer';

/**
 * Direct selector to the iTunesProvider state domain
 */

export const selectITunesProviderDomain = (state) => state.iTunes || initialState;

export const selectITunes = () => createSelector(selectITunesProviderDomain, (substate) => substate);

export const selectSearchTerm = () =>
  createSelector(selectITunesProviderDomain, (substate) => get(substate, 'searchTerm'));

export const selectTracks = () => createSelector(selectITunesProviderDomain, (substate) => get(substate, 'tracks'));

export const selectError = () => createSelector(selectITunesProviderDomain, (substate) => get(substate, 'error'));

export const selectTrackById = (trackId) =>
  createSelector(selectITunesProviderDomain, (substate) => get(substate, `tracks.results[${trackId}]`));
