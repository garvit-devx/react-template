/**
 *
 * Tests for TrackDetails
 *
 */

import React from 'react';
import { fireEvent } from '@testing-library/dom';
import { renderWithIntl, timeout } from '@utils/testUtils';
import TrackDetails from '../index';

const trackDetails = {
  trackName: 'Perfect',
  artistName: 'One Direction',
  previewUrl: 'Some URL',
  artworkUrl100: 'Some URL',
  trackTimeMillis: 123456789
};

describe('<TrackDetails />', () => {
  it('should render and match the snapshot', () => {
    const { baseElement } = renderWithIntl(<TrackDetails trackDetails={trackDetails} />);
    expect(baseElement).toMatchSnapshot();
  });

  it('should contain 1 TrackDetails component', () => {
    const { getAllByTestId } = renderWithIntl(<TrackDetails trackDetails={trackDetails} />);
    expect(getAllByTestId('track-details').length).toBe(1);
  });

  it('should render track details component with all necessary elements', () => {
    const { getByTestId, getByRole, getByText } = renderWithIntl(<TrackDetails trackDetails={trackDetails} />);

    const playButton = getByRole('button', {
      value: { text: 'Play Preview' }
    });
    const audioElement = getByTestId('audio');
    const tackImage = getByRole('img');
    const trackName = getByText(/perfect/i);
    const artistName = getByText(/one direction/i);

    expect(playButton).toBeInTheDocument();
    expect(audioElement).toBeInTheDocument();
    expect(tackImage).toBeInTheDocument();
    expect(trackName).toBeInTheDocument();
    expect(artistName).toBeInTheDocument();
  });

  it('should change button text if button is clicked', async () => {
    const { getByRole } = renderWithIntl(<TrackDetails trackDetails={trackDetails} />);

    let button = getByRole('button', {
      value: { text: 'Play Preview' }
    });
    expect(button).toBeInTheDocument();

    // Text should change to pause if button is clicked
    fireEvent.click(button);
    await timeout(100);
    button = getByRole('button', {
      value: { text: 'Pause' }
    });
    expect(button).toBeInTheDocument();

    // text should change back to 'Play preview' if button is clicked again
    fireEvent.click(button);
    await timeout(100);
    button = getByRole('button', {
      value: { text: 'Play Preview' }
    });
    expect(button).toBeInTheDocument();
  });

  it('should change button text to Play Preview when audio preview ends', async () => {
    const { getByRole, getByTestId } = renderWithIntl(<TrackDetails trackDetails={trackDetails} />);

    let button;

    const audioElement = getByTestId('audio');

    fireEvent(audioElement, new Event('play'));
    await timeout(1000);

    button = getByRole('button', {
      value: { text: 'Pause' }
    });
    expect(button).toBeInTheDocument();

    fireEvent(audioElement, new Event('ended'));
    await timeout(100);

    button = getByRole('button', {
      value: { text: 'Play Preview' }
    });
    expect(button).toBeInTheDocument();
  });
});
