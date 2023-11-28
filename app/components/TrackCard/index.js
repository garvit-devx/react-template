import React, { useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import styled from '@emotion/styled';

const CustomCard = styled(Card)`
  padding: 0.5rem;
  margin: 1rem auto;
  width: 100%;
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  aspect-ratio: 1/1;
  object-fit: cover;
`;

const AudioPlayer = ({ previewUrl }) => {
  const audioRef = useRef();
  const [isPlaying, setIsPlaying] = useState(false);

  const handleOnClick = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }

    setIsPlaying((currentVal) => !currentVal);
  };

  return (
    <>
      <Button
        variant="secondary"
        sx={{ border: '1px solid black', margin: '1rem 0' }}
        onClick={handleOnClick}
        data-testid="preview-btn"
      >
        {isPlaying ? 'Pause' : 'Preview'}
      </Button>
      <audio ref={audioRef} src={previewUrl} onEnded={() => setIsPlaying(false)} data-testid="audio-element" />
    </>
  );
};

export default function TrackCard({ trackDetails }) {
  const history = useHistory();

  const handleDetailsBtnClick = (trackId) => {
    history.push(`/itunes/${trackId}`);
  };

  return (
    <CustomCard data-testid="track-card">
      <Image
        src={trackDetails.artworkUrl100}
        alt={`${trackDetails.trackName} thumbnail`}
        height={350}
        width={350}
        data-testid="track-image"
      />
      <h4 data-testid="track-name">{trackDetails.trackName || 'Track Name not available'}</h4>
      <p data-testid="artist-name">Artist: {trackDetails.artistName || 'Artist name not available'}</p>

      <AudioPlayer previewUrl={trackDetails.previewUrl} />
      <Button
        variant="secondary"
        sx={{ border: '1px solid black', margin: '1rem' }}
        data-testid="details-btn"
        onClick={() => handleDetailsBtnClick(trackDetails.trackId)}
      >
        Details
      </Button>
    </CustomCard>
  );
}

AudioPlayer.propTypes = {
  previewUrl: PropTypes.string
};

TrackCard.propTypes = {
  trackDetails: PropTypes.shape({
    trackId: PropTypes.number,
    trackName: PropTypes.string,
    artistName: PropTypes.string,
    artworkUrl100: PropTypes.string,
    previewUrl: PropTypes.string
  })
};
