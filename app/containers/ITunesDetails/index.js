/**
 *
 * ITunesDeatails Container
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { injectSaga } from 'redux-injectors';
import T from '@components/T';
import TrackDetails from '@app/components/TrackDetails/index';
import { selectTrackById } from '@app/containers/ITunesProvider/selectors';
import { selectResults, selectError } from './selectors';
import saga from './saga';
import { iTunesDetailsCreators } from './reducer';

export function ITunesDetails({ results, dispatchGetTrackDetails, error, trackById, match }) {
  const trackId = match.params.trackId;
  const { artistName, artworkUrl100, previewUrl, trackName, trackTimeMillis } = trackById
    ? trackById
    : results
    ? results.results[0]
    : {};

  useEffect(() => {
    // fetching data from redux
    if (trackById?.trackId != trackId) {
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
  trackById: PropTypes.object,
  match: PropTypes.object
};

const mapStateToProps = (state, ownProps) =>
  createStructuredSelector({
    results: selectResults(),
    error: selectError(),
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
