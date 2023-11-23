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
    const { getByTestId } = renderProvider(<TrackCard trackDetails={trackDetails} />);

    const trackName = getByTestId('track-name');
    const artistName = getByTestId('artist-name');
    const trackImage = getByTestId('track-image');
    const previewBtn = getByTestId('preview-btn');
    const audioElement = getByTestId('audio-element');

    expect(trackImage).toBeInTheDocument();
    expect(trackName).toHaveTextContent(trackDetails.trackName);
    expect(artistName).toHaveTextContent(trackDetails.artistName);
    expect(previewBtn).toBeInTheDocument();
    expect(audioElement).toBeInTheDocument();
  });

  it('should display correct text in the preview/pause button', async () => {
    // Initial text should be 'Preview'
    const { getByTestId } = renderProvider(<TrackCard trackDetails={trackDetails} />);
    const previewBtn = getByTestId('preview-btn');
    expect(previewBtn).toHaveTextContent('Preview');

    // Text should change to 'Pause' if button is clicked
    fireEvent.click(previewBtn);
    await timeout(100);
    expect(previewBtn).toHaveTextContent('Pause');

    // Text content should change back to 'Preview' if button is clicked again
    fireEvent.click(previewBtn);
    await timeout(100);
    expect(previewBtn).toHaveTextContent('Preview');
  });

  it('should set button text back to "Preview" when audio preview ends', () => {
    const { getByTestId } = renderProvider(<TrackCard trackDetails={trackDetails} />);
    const previewBtn = getByTestId('preview-btn');
    const audioElement = getByTestId('audio-element');

    fireEvent(audioElement, new Event('ended'));
    expect(previewBtn).toHaveTextContent('Preview');
  });
});
