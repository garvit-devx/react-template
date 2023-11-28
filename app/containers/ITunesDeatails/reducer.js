/*
 *
 * ITunesDeatails reducer
 *
 */
import produce from 'immer';
import { createActions } from 'reduxsauce';

export const initialState = {
  trackId: null,
  results: [],
  error: null
};

export const { Types: iTunesDeatailsTypes, Creators: iTunesDeatailsCreators } = createActions({
  getTrackDetails: ['trackId'],
  successGetTrackDetails: ['results'],
  failureGetTrackDetails: ['error']
});

export const iTunesDeatailsReducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case iTunesDeatailsTypes.GET_TRACK_DETAILS:
        draft.trackId = action.trackId;
        break;
      case iTunesDeatailsTypes.SUCCESS_GET_TRACK_DETAILS:
        draft.results = action.results;
        break;
      case iTunesDeatailsTypes.FAILURE_GET_TRACK_DETAILS:
        draft.error = action.error;
        break;
    }
  });
};

export default iTunesDeatailsReducer;
