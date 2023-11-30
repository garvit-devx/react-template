/**
 *
 * ITunes Container
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import styled from '@emotion/styled';
import { OutlinedInput, Button, Container } from '@mui/material';
import { t } from '@lingui/macro';
import T from '@components/T';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { injectSaga } from 'redux-injectors';
import If from '@app/components/If/index';
import TrackCard from '@app/components/TrackCard/index';
import { selectError, selectTracks } from '../ITunesProvider/selectors';
import iTunesProviderSaga from '../ITunesProvider/saga';
import { iTunesProviderCreators } from '../ITunesProvider/reducer';

const PageContainer = styled(Container)`
  && {
    margin: 2em auto;
    max-width: ${(props) => props.maxwidth}px;
    padding: 0.5em;
  }
`;
const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 1em;
`;

export function ITunes({ dispatchGetTracks, tracks, maxwidth }) {
  const [searchText, setSearchText] = useState('');
  const [currentAudioUrl, setCurrentAudioUrl] = useState(null);
  const allTracks = Object.values(get(tracks, 'results', {}));
  const totalResults = get(tracks, 'resultCount', 0);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    dispatchGetTracks(searchText);
  };

  const handleToggle = (audioUrl) => {
    setCurrentAudioUrl(audioUrl);
  };

  return (
    <PageContainer maxwidth={maxwidth}>
      <T id="itunes_search" />
      <form onSubmit={handleOnSubmit} role="form">
        <OutlinedInput
          placeholder={t`Search any track`}
          sx={{ minWidth: '350px' }}
          onChange={(e) => setSearchText(e.target.value)}
          value={searchText}
        />
        <Button variant="secondary" type="submit" sx={{ border: '1px solid black', margin: '0 0.5em' }}>
          <T id="search" />
        </Button>
      </form>

      <If condition={!isEmpty(allTracks) && totalResults > 0}>
        <T id="total_results" values={{ totalResults }} style={{ margin: '1rem 0' }} />

        <GridContainer>
          {allTracks.map((track) => (
            <TrackCard
              key={track.trackId}
              trackDetails={track}
              onToggle={handleToggle}
              isPlaying={currentAudioUrl === track.previewUrl}
            />
          ))}
        </GridContainer>
      </If>
    </PageContainer>
  );
}

ITunes.propTypes = {
  dispatchGetTracks: PropTypes.func,
  tracks: PropTypes.shape({
    resultCount: PropTypes.number,
    results: PropTypes.object
  }),
  maxwidth: PropTypes.number
};

const mapStateToProps = createStructuredSelector({
  tracks: selectTracks(),
  error: selectError()
});

function mapDispatchToProps(dispatch) {
  const { requestGetTracks } = iTunesProviderCreators;
  return {
    dispatchGetTracks: (searchTerm) => dispatch(requestGetTracks(searchTerm))
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, injectSaga({ key: 'iTunes', saga: iTunesProviderSaga }))(ITunes);

export const ITunesTest = compose()(ITunes);
