import { createSelector } from 'reselect';
import get from 'lodash/get';
import { initialState } from './reducer';

/**
 * Direct selector to the iTunes state domain
 */

export const selectITunesDomain = (state) => state.iTunes || initialState;

export const selectITunes = () => createSelector(selectITunesDomain, (substate) => substate);

export const selectTracks = () => createSelector(selectITunesDomain, (substate) => get(substate, 'tracks'));

export const selectError = () => createSelector(selectITunesDomain, (substate) => get(substate, 'error'));
