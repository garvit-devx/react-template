/**
 *
 * ITunes Container
 *
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import styled from '@emotion/styled';
import { Button, Container } from '@mui/material';
import { t } from '@lingui/macro';
import T from '@components/T';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { injectSaga } from 'redux-injectors';
import If from '@app/components/If/index';
import TrackCard from '@app/components/TrackCard/index';
import { selectError, selectTracks, selectSearchTerm } from '@app/containers/ITunesProvider/selectors';
import iTunesProviderSaga from '@app/containers/ITunesProvider/saga';
import { iTunesProviderCreators } from '@app/containers/ITunesProvider/reducer';

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

const SearchButton = styled(Button)`
  border: 1px solid black;
  margin: 0 1em;
  padding: 8px 1em;
`;

const Input = styled.input`
  min-width: 350px;
  padding: 8px 1em 10px;
  border: 1px solid #dcdcdc;
  outline: none;
  transition: all 0.3s;
  border-radius: 4px;
  background: transparent;

  &:focus {
    border: 1px solid black;
  }
`;

export function ITunes({ dispatchGetTracks, tracks, maxwidth, searchTerm }) {
  const [searchText, setSearchText] = useState('');
  const [currentAudioUrl, setCurrentAudioUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const allTracks = Object.values(get(tracks, 'results', {}));
  const totalResults = get(tracks, 'resultCount', 0);

  useEffect(() => {
    // if there is a search term but no results in the track substate, then show loading text
    if (searchTerm && Object.values(get(tracks, 'results', {})).length === 0) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [tracks?.results]);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    dispatchGetTracks(searchText);
    setLoading(true);
  };

  const handleToggle = (audioUrl) => {
    setCurrentAudioUrl(audioUrl);
  };

  return (
    <PageContainer maxwidth={maxwidth}>
      <T id="itunes_search" />
      <form onSubmit={handleOnSubmit} role="form" style={{ margin: '0.5em 0' }}>
        <Input placeholder={t`Search any track`} onChange={(e) => setSearchText(e.target.value)} value={searchText} />
        <SearchButton
          variant="secondary"
          type="submit"
          sx={{ border: '1px solid black', margin: '0 1em', padding: '10px 1em' }}
        >
          <T id="search" />
        </SearchButton>
      </form>

      <If condition={loading}>
        <T id="loading" style={{ margin: '1rem 0' }} />
      </If>

      <If condition={!loading && !isEmpty(allTracks) && totalResults > 0}>
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
  searchTerm: PropTypes.string,
  maxwidth: PropTypes.number
};

const mapStateToProps = createStructuredSelector({
  tracks: selectTracks(),
  error: selectError(),
  searchTerm: selectSearchTerm()
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
