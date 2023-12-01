/**
 *
 * TrackDetails
 *
 */

import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import styled from '@emotion/styled';
import T from '@components/T';

const TrackDetailsContainer = styled.div`
  display: flex;
  gap: 2rem;
  max-width: 720px;
  margin: 3em auto;
`;

const TrackImage = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
  aspect-ratio: 1/1;
`;

export function TrackDetails({ trackDetails }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const { artistName, artworkUrl100, previewUrl, trackName, trackTimeMillis } = trackDetails;
  const trackTimeInMinutes = (trackTimeMillis / 1000 / 60).toFixed(2);

  function handleOnClick() {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }

    setIsPlaying((currentValue) => !currentValue);
  }

  return (
    <TrackDetailsContainer>
      <div style={{ width: '300px' }}>
        <TrackImage src={artworkUrl100} alt={trackName} />
      </div>

      <div>
        <T id="track_name" values={{ trackName }} />
        <T id="track_artist" values={{ artistName }} />
        <T id="track_time" values={{ trackTimeInMinutes }} />

        <Button variant="secondary" sx={{ border: '1px solid black', margin: '1rem 0' }} onClick={handleOnClick}>
          {isPlaying ? <T id="pause" /> : <T id="play_preview" />}
        </Button>
        <audio src={previewUrl} ref={audioRef} onEnded={() => setIsPlaying(false)} />
      </div>
    </TrackDetailsContainer>
  );
}

TrackDetails.propTypes = {
  trackDetails: PropTypes.shape({
    artistName: PropTypes.string,
    artworkUrl100: PropTypes.string,
    previewUrl: PropTypes.string,
    trackName: PropTypes.string,
    trackTimeMillis: PropTypes.number
  })
};

export default TrackDetails;
