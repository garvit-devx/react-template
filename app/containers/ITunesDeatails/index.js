/**
 *
 * ITunesDeatails Container
 *
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { injectSaga } from 'redux-injectors';
import T from '@components/T';
import TrackDetails from '@app/components/TrackDetails/index';
import { selectResults, selectError } from './selectors';
import { selectTracks, selectTrackById } from '../ITunesProvider/selectors';
import saga from './saga';
import { iTunesDetailsCreators } from './reducer';

export function ITunesDetails({ results, dispatchGetTrackDetails, error, tracks, match }) {
  const trackId = match.params.trackId;
  const [trackDetails, setTrackDetails] = useState(null);

  const { artistName, artworkUrl100, previewUrl, trackName, trackTimeMillis } = trackDetails
    ? trackDetails
    : results
    ? results.results[0]
    : {};

  useEffect(() => {
    // fetching data from redux
    if (tracks?.results.hasOwnProperty(trackId)) {
      setTrackDetails(tracks.results[trackId]);
    } else {
      // making dispatch action to get track details from api
      dispatchGetTrackDetails(trackId);
    }
  }, [trackId]);

  if (error !== null) {
    return (
      <div style={{ margin: '3rem auto', textAlign: 'center' }}>
        <T id="track_details_error_msg" />
      </div>
    );
  }
  return <TrackDetails trackDetails={{ artistName, artworkUrl100, previewUrl, trackName, trackTimeMillis }} />;
}

ITunesDetails.propTypes = {
  results: PropTypes.object,
  dispatchGetTrackDetails: PropTypes.func,
  error: PropTypes.object,
  tracks: PropTypes.object,
  match: PropTypes.object
};

const mapStateToProps = (state, ownProps) =>
  createStructuredSelector({
    results: selectResults(),
    error: selectError(),
    tracks: selectTracks(),
    trackById: selectTrackById(ownProps.match.params.trackId)
  });

function mapDispatchToProps(dispatch) {
  const { getTrackDetails } = iTunesDetailsCreators;
  return {
    dispatchGetTrackDetails: (trackId) => dispatch(getTrackDetails(trackId))
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, injectSaga({ key: 'iTunesDeatails', saga }))(ITunesDetails);

export const ITunesDetailsTest = compose()(ITunesDetails);
