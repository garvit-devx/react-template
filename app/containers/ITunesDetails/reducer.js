/*
 *
 * ITunesDeatails reducer
 *
 */
import produce from 'immer';
import { createActions } from 'reduxsauce';

export const initialState = {
  trackId: null,
  songDetails: null,
  error: null
};

export const { Types: iTunesDetailsTypes, Creators: iTunesDetailsCreators } = createActions({
  getTrackDetails: ['trackId'],
  successGetTrackDetails: ['songDetails'],
  failureGetTrackDetails: ['error']
});

export const iTunesDetailsReducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case iTunesDetailsTypes.GET_TRACK_DETAILS:
        draft.trackId = action.trackId;
        break;
      case iTunesDetailsTypes.SUCCESS_GET_TRACK_DETAILS:
        draft.songDetails = action.songDetails;
        break;
      case iTunesDetailsTypes.FAILURE_GET_TRACK_DETAILS:
        draft.error = action.error;
        break;
    }
  });
};

export default iTunesDetailsReducer;
