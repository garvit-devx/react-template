/*
 *
 * ITunes reducer
 *
 */
import produce from 'immer';
import { createActions } from 'reduxsauce';

export const initialState = {
  searchTerm: null,
  tracks: null,
  error: null
};

export const { Types: iTunesTypes, Creators: iTunesCreators } = createActions({
  requestGetTracks: ['searchTerm'],
  successGetTracks: ['tracks'],
  failureGetTracks: ['error']
});

export const iTunesReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case iTunesTypes.REQUEST_GET_TRACKS:
        draft.searchTerm = action.searchTerm;
        break;
      case iTunesTypes.SUCCESS_GET_TRACKS:
        draft.tracks = action.tracks;
        break;
      case iTunesTypes.FAILURE_GET_TRACKS:
        draft.error = action.error;
        break;
    }
  });

export default iTunesReducer;
