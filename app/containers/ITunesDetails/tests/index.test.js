/**
 *
 * Tests for ITunesDetails container
 *
 *
 */

import React from 'react';
import { MemoryRouter, Route } from 'react-router-dom';
import { renderProvider } from '@utils/testUtils';
import { ITunesDetailsTest as ITunesDetails } from '@app/containers/ITunesDetails/index';

describe('<ITunesDetails /> container tests', () => {
  let dispatchGetTrackDetailsSpy = jest.fn();

  it('should render and match the snapshot', () => {
    const { baseElement } = renderProvider(
      <ITunesDetails dispatchGetTrackDetails={dispatchGetTrackDetailsSpy} match={{ params: { trackId: '12345' } }} />
    );
    expect(baseElement).toMatchSnapshot();
  });

  it('should display error message if error state is not null', () => {
    const { getByText } = renderProvider(
      <ITunesDetails
        dispatchGetTrackDetails={dispatchGetTrackDetailsSpy}
        error={{ errorMessage: 'Something went wrong' }}
        match={{ params: { trackId: '12345' } }}
      />
    );
    const errorMsgElement = getByText(/could not fetch details/i);

    expect(errorMsgElement).toBeInTheDocument();
  });

  it('should render track details component correctly if data is present in redux', async () => {
    const trackById = {
      trackId: 12345,
      trackName: 'ignite',
      artistName: 'Alan Walker',
      artworkUrl100: 'Some URL',
      previewUrl: 'Some URL',
      trackTimeMillis: 100000
    };

    const { getByText, getByRole } = renderProvider(
      <MemoryRouter initialEntries={['/itunes/12345']}>
        <Route path="/itunes/:trackId">
          <ITunesDetails
            dispatchGetTrackDetails={dispatchGetTrackDetailsSpy}
            error={null}
            trackById={trackById}
            match={{ params: { trackId: '12345' } }}
          />
        </Route>
      </MemoryRouter>
    );

    const trackNameElement = getByText(/ignite/i);
    const artistNameElement = getByText(/alan walker/i);
    const trackImage = getByRole('img');

    expect(trackNameElement).toBeInTheDocument();
    expect(artistNameElement).toBeInTheDocument();
    expect(trackImage).toBeInTheDocument();
  });

  it('should dispatch getTrackDetails action if data is not present in redux', () => {
    renderProvider(
      <MemoryRouter initialEntries={['/itunes/12345']}>
        <Route path="/itunes/:trackId">
          <ITunesDetails
            dispatchGetTrackDetails={dispatchGetTrackDetailsSpy}
            match={{ params: { trackId: '12345' } }}
          />
        </Route>
      </MemoryRouter>
    );

    expect(dispatchGetTrackDetailsSpy).toBeCalledWith('12345');
  });
});
