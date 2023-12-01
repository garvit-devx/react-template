import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the iTunesDeatails state domain
 */

const selectITunesDetailsDomain = (state) => state.iTunesDetails || initialState;

export const selectITunesDetails = () => createSelector(selectITunesDetailsDomain, (substate) => substate);

export const selectSongDetails = () => createSelector(selectITunesDetailsDomain, (substate) => substate.songDetails);

export const selectError = () => createSelector(selectITunesDetailsDomain, (substate) => substate.error);

export const selectTrackById = (trackId) =>
  createSelector(selectITunesDetailsDomain, (substate) => substate.results.results[trackId]);
