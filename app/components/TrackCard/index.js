import React, { useRef, useState } from 'react';
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
      <Button variant="secondary" sx={{ border: '1px solid black', margin: '1rem 0' }} onClick={handleOnClick}>
        {isPlaying ? 'Pause' : 'Preview'}
      </Button>
      <audio ref={audioRef} src={previewUrl} onEnded={() => setIsPlaying(false)} />
    </>
  );
};

export default function TrackCard({ trackDetails }) {
  return (
    <CustomCard>
      <Image src={trackDetails.artworkUrl100} alt={`${trackDetails.trackName} thumbnail`} height={350} width={350} />
      <h4>{trackDetails.trackName}</h4>
      <p>Artist: {trackDetails.artistName}</p>

      <AudioPlayer previewUrl={trackDetails.previewUrl} />
    </CustomCard>
  );
}

AudioPlayer.propTypes = {
  previewUrl: PropTypes.string
};

TrackCard.propTypes = {
  trackDetails: PropTypes.shape({
    trackName: PropTypes.string,
    artistName: PropTypes.string,
    artworkUrl100: PropTypes.string,
    previewUrl: PropTypes.string
  })
};
