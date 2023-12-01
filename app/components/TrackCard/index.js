import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import styled from '@emotion/styled';
import T from '@components/T/index';

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

export default function TrackCard({ trackDetails, onToggle, isPlaying }) {
  const audioRef = useRef();
  const [play, setPlay] = useState(isPlaying);
  const history = useHistory();

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
      setPlay(true);
    } else {
      audioRef.current.pause();
      setPlay(false);
    }
  }, [isPlaying]);

  const handleOnClick = () => {
    onToggle(trackDetails.previewUrl);
    if (play) {
      audioRef.current.pause();
      setPlay(false);
    } else {
      audioRef.current.play();
      setPlay(true);
    }
  };

  const handleDetailsBtnClick = (trackId) => {
    history.push(`/itunes/${trackId}`);
  };

  return (
    <>
      <CustomCard role="track-card">
        <Image src={trackDetails.artworkUrl100} alt={`${trackDetails.trackName} thumbnail`} height={350} width={350} />
        <T
          id="track_name"
          values={{ trackName: trackDetails.trackName || 'Track Name not available' }}
          style={{ fontWeight: 'bold', margin: '1rem 0' }}
        />
        <T id="track_artist" values={{ artistName: trackDetails.artistName || 'Artist name not available' }} />

        <Button variant="secondary" sx={{ border: '1px solid black', margin: '1rem 0' }} onClick={handleOnClick}>
          {play ? <T id="pause" /> : <T id="preview" />}
        </Button>
        <audio ref={audioRef} src={trackDetails.previewUrl} onEnded={() => setPlay(false)} role="audio" />
        <Button
          variant="secondary"
          sx={{ border: '1px solid black', margin: '1rem' }}
          onClick={() => handleDetailsBtnClick(trackDetails.trackId)}
        >
          <T id="details" />
        </Button>
      </CustomCard>
    </>
  );
}

TrackCard.propTypes = {
  trackDetails: PropTypes.shape({
    trackId: PropTypes.number,
    trackName: PropTypes.string,
    artistName: PropTypes.string,
    artworkUrl100: PropTypes.string,
    previewUrl: PropTypes.string
  }),
  onToggle: PropTypes.func,
  isPlaying: PropTypes.bool
};
