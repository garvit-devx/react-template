/*
 *
 * ITunesProvider reducer
 *
 */

import produce from 'immer';
import { createActions } from 'reduxsauce';

export const initialState = {
  searchTerm: null,
  tracks: null,
  error: null
};

export const { Types: iTunesProviderTypes, Creators: iTunesProviderCreators } = createActions({
  requestGetTracks: ['searchTerm'],
  successGetTracks: ['tracks'],
  failureGetTracks: ['error']
});

export const iTunesProviderReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case iTunesProviderTypes.REQUEST_GET_TRACKS:
        draft.searchTerm = action.searchTerm;
        break;
      case iTunesProviderTypes.SUCCESS_GET_TRACKS:
        draft.tracks = action.tracks;
        break;
      case iTunesProviderTypes.FAILURE_GET_TRACKS:
        draft.error = action.error;
        break;
    }
  });

export default iTunesProviderReducer;
