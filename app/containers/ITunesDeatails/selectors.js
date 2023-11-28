import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the iTunesDeatails state domain
 */

const selectITunesDeatailsDomain = (state) => state.iTunesDeatails || initialState;

export const selectITunesDeatails = () => createSelector(selectITunesDeatailsDomain, (substate) => substate);

export const selectResults = () => createSelector(selectITunesDeatailsDomain, (substate) => substate.results);

export const selectError = () => createSelector(selectITunesDeatailsDomain, (substate) => substate.error);
