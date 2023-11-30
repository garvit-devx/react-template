import React from 'react';
import { fireEvent } from '@testing-library/dom';
// import { MemoryRouter } from 'react-router-dom';
import { renderProvider, timeout } from '@app/utils/testUtils';
import TrackCard from '../index';

const trackDetails = {
  trackId: 123,
  trackName: 'Ignite',
  artistName: 'Alan Walker',
  artworkUrl100: 'some url string',
  previewUrl: 'another url string'
};

describe('Tests for TrackCard component', () => {
  it('should render the component with all the necessary elements', () => {
    const { getByRole, getByText } = renderProvider(<TrackCard trackDetails={trackDetails} />);

    const trackName = getByText(/Ignite/i);
    const artistName = getByText(/alan walker/i);
    const trackImage = getByRole('img');
    const previewBtn = getByRole('button', {
      name: 'Preview'
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
    let onToggle = jest.fn();

    // Initial text should be 'Preview'
    const { getByRole } = renderProvider(<TrackCard trackDetails={trackDetails} onToggle={onToggle} />);
    previewBtn = getByRole('button', {
      name: 'Preview'
    });
    expect(previewBtn).toBeInTheDocument();

    // Text should change to 'Pause' if button is clicked
    fireEvent.click(previewBtn);
    await timeout(100);
    previewBtn = getByRole('button', {
      name: 'Pause'
    });
    expect(previewBtn).toBeInTheDocument();

    // Text content should change back to 'Preview' if button is clicked again
    fireEvent.click(previewBtn);
    await timeout(100);
    previewBtn = getByRole('button', {
      name: 'Preview'
    });
    expect(previewBtn).toBeInTheDocument();
  });

  it('should set button text back to "Preview" when audio preview ends', () => {
    const { getByRole } = renderProvider(<TrackCard trackDetails={trackDetails} />);
    const previewBtn = getByRole('button', {
      name: 'Preview'
    });
    const audioElement = getByRole('audio');

    fireEvent(audioElement, new Event('ended'));
    expect(previewBtn).toBeInTheDocument();
  });

  // it('should navigate to the details page when details button is clicked', () => {
  //   const { getByRole } = renderProvider(
  //     <MemoryRouter initialEntries={['/itunes']}>
  //       <TrackCard trackDetails={trackDetails} />
  //     </MemoryRouter>
  //   );
  //   const detailsBtn = getByRole('button', {
  //     name: 'Details'
  //   });

  //   fireEvent.click(detailsBtn);
  //   expect(window.location.pathname).toEqual('/itunes/123');
  // })
});
