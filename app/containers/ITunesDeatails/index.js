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
import { useParams } from 'react-router-dom';
import T from '@components/T';
import TrackDetails from '@app/components/TrackDetails/index';
import { selectResults, selectError } from './selectors';
import { selectTracks } from '../ITunes/selectors';
import saga from './saga';
import { iTunesDeatailsCreators } from './reducer';

export function ITunesDeatails({ results, dispatchGetTrackDetails, error, tracks }) {
  const { trackId } = useParams();
  const [trackDetails, setTrackDetails] = useState(null);
  const { artistName, artworkUrl100, previewUrl, trackName, trackTimeMillis } = trackDetails || results.results[0];

  useEffect(() => {
    if (tracks.results.hasOwnProperty(trackId)) {
      setTrackDetails(tracks.results[trackId]);
    } else {
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

  // Displaying track details if error is null
  return <TrackDetails trackDetails={{ artistName, artworkUrl100, previewUrl, trackName, trackTimeMillis }} />;
}

ITunesDeatails.propTypes = {
  results: PropTypes.object,
  dispatchGetTrackDetails: PropTypes.func,
  error: PropTypes.object,
  tracks: PropTypes.object
};

const mapStateToProps = createStructuredSelector({
  results: selectResults(),
  error: selectError(),
  tracks: selectTracks()
});

function mapDispatchToProps(dispatch) {
  const { getTrackDetails } = iTunesDeatailsCreators;
  return {
    dispatchGetTrackDetails: (trackId) => dispatch(getTrackDetails(trackId))
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, injectSaga({ key: 'iTunesDeatails', saga }))(ITunesDeatails);

export const ITunesDeatailsTest = compose()(ITunesDeatails);
