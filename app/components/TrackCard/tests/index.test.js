import React from 'react';
import { fireEvent } from '@testing-library/dom';
import { renderProvider, timeout } from '@app/utils/testUtils';
import TrackCard from '../index';

const trackDetails = {
  trackName: 'Ignite',
  artistName: 'Alan Walker',
  artworkUrl100: 'some url string',
  previewUrl: 'another url string'
};

describe('Tests for TrackCard component', () => {
  it('should render the component with all the necessary elements', () => {
    const { getByRole, getByText } = renderProvider(<TrackCard trackDetails={trackDetails} />);
    const artistRegex = new RegExp('Alan Walker', 'i');

    const trackName = getByText('Ignite');
    const artistName = getByText(artistRegex);
    const trackImage = getByRole('img');
    const previewBtn = getByRole('button', {
      value: { text: 'Preview' }
    });
    const audioElement = getByRole('audio');

    expect(trackImage).toBeInTheDocument();
    expect(trackName).toBeInTheDocument();
    expect(artistName).toBeInTheDocument();
    expect(previewBtn).toBeInTheDocument();
    expect(audioElement).toBeInTheDocument();
  });

  it('should display correct text in the preview/pause button', async () => {
    let previewBtn;

    // Initial text should be 'Preview'
    const { getByRole } = renderProvider(<TrackCard trackDetails={trackDetails} />);
    previewBtn = getByRole('button', {
      value: { text: 'Preview' }
    });
    expect(previewBtn).toBeInTheDocument();

    // Text should change to 'Pause' if button is clicked
    fireEvent.click(previewBtn);
    await timeout(100);
    previewBtn = getByRole('button', {
      value: { text: 'Pause' }
    });
    expect(previewBtn).toBeInTheDocument();

    // Text content should change back to 'Preview' if button is clicked again
    fireEvent.click(previewBtn);
    await timeout(100);
    previewBtn = getByRole('button', {
      value: { text: 'Preview' }
    });
    expect(previewBtn).toBeInTheDocument();
  });

  it('should set button text back to "Preview" when audio preview ends', () => {
    const { getByRole } = renderProvider(<TrackCard trackDetails={trackDetails} />);
    const previewBtn = getByRole('button', {
      value: { text: 'Preview' }
    });
    const audioElement = getByRole('audio');

    fireEvent(audioElement, new Event('ended'));
    expect(previewBtn).toBeInTheDocument();
  });
});
