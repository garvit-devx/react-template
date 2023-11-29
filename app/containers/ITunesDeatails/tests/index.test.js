/**
 *
 * Tests for ITunesDeatails container
 *
 *
 */

import React from 'react';
import { MemoryRouter, Route } from 'react-router-dom';
// import { fireEvent } from '@testing-library/dom';
import { renderProvider } from '@utils/testUtils';
import { ITunesDeatailsTest as ITunesDeatails } from '../index';

describe('<ITunesDeatails /> container tests', () => {
  // let submitSpy;
  let dispatchGetTrackDetailsSpy = jest.fn();

  beforeEach(() => {
    // submitSpy = jest.fn();
  });

  it('should render and match the snapshot', () => {
    const { baseElement } = renderProvider(<ITunesDeatails dispatchGetTrackDetails={dispatchGetTrackDetailsSpy} />);
    expect(baseElement).toMatchSnapshot();
  });

  it('should display error message if error state is not null', () => {
    const { getByText } = renderProvider(
      <ITunesDeatails
        dispatchGetTrackDetails={dispatchGetTrackDetailsSpy}
        error={{ errorMessage: 'Something went wrong' }}
      />
    );
    const errorMsgElement = getByText(/could not fetch details/i);

    expect(errorMsgElement).toBeInTheDocument();
  });

  it('should render track details component correctly if data is present in redux', async () => {
    const tracks = {
      results: {
        12345: {
          trackId: 12345,
          trackName: 'ignite',
          artistName: 'Alan Walker',
          artworkUrl100: 'Some URL',
          previewUrl: 'Some URL',
          trackTimeMillis: 100000
        }
      }
    };

    const { getByText, getByRole } = renderProvider(
      <MemoryRouter initialEntries={['/itunes/12345']}>
        <Route path="/itunes/:trackId">
          <ITunesDeatails dispatchGetTrackDetails={dispatchGetTrackDetailsSpy} error={null} tracks={tracks} />
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
          <ITunesDeatails dispatchGetTrackDetails={dispatchGetTrackDetailsSpy} />
        </Route>
      </MemoryRouter>
    );

    expect(dispatchGetTrackDetailsSpy).toBeCalledWith('12345');
  });
});
