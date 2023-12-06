/**
 *
 * Stories for TrackDetails
 *
 * @see https://github.com/storybookjs/storybook
 *
 */

import React from 'react';
import { TrackDetails } from '../index';

const trackDetails = {
  artistName: 'Alan Walker',
  trackName: 'The Way You Make Me Feel',
  trackTimeMillis: 214000,
  previewUrl: 'Some URL string',
  artworkUrl100: 'Some URL string'
};

export default {
  title: 'TrackDetails',
  component: TrackDetails
};

export const SampleTrackDetails = () => <TrackDetails trackDetails={trackDetails} />;
