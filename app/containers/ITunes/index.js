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
import { selectError, selectTracks } from './selectors';
import iTunesSaga from './saga';
import { iTunesCreators } from './reducer';

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
  const allTracks = get(tracks, 'results', []);
  const totalResults = get(tracks, 'resultCount', 0);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    dispatchGetTracks(searchText);
  };

  return (
    <PageContainer maxwidth={maxwidth}>
      <T id="itunes_search" />
      <form onSubmit={handleOnSubmit} data-testid="search-form">
        <OutlinedInput
          placeholder={t`Search any track`}
          sx={{ minWidth: '350px' }}
          onChange={(e) => setSearchText(e.target.value)}
          value={searchText}
          inputProps={{ 'data-testid': 'search-input' }}
        />
        <Button variant="secondary" type="submit" sx={{ border: '1px solid black', margin: '0 0.5em' }}>
          Search
        </Button>
      </form>

      <If condition={!isEmpty(allTracks) && totalResults > 0}>
        <p data-testid="total-results" style={{ margin: '2em 0' }}>
          Total Results: {totalResults}
        </p>

        <GridContainer>
          {allTracks.map((track) => (
            <TrackCard key={track.trackId} trackDetails={track} />
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
    results: PropTypes.array
  }),
  maxwidth: PropTypes.number
};

const mapStateToProps = createStructuredSelector({
  tracks: selectTracks(),
  error: selectError()
});

function mapDispatchToProps(dispatch) {
  const { requestGetTracks } = iTunesCreators;
  return {
    dispatchGetTracks: (searchTerm) => dispatch(requestGetTracks(searchTerm))
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, injectSaga({ key: 'iTunes', saga: iTunesSaga }))(ITunes);

export const ITunesTest = compose()(ITunes);
