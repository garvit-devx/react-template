import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the iTunesDeatails state domain
 */

const selectITunesDetailsDomain = (state) => state.iTunesDetails || initialState;

export const selectITunesDetails = () => createSelector(selectITunesDetailsDomain, (substate) => substate);

export const selectResults = () => createSelector(selectITunesDetailsDomain, (substate) => substate.results);

export const selectError = () => createSelector(selectITunesDetailsDomain, (substate) => substate.error);
