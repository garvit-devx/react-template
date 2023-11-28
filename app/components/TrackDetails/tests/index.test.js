/**
 *
 * Tests for TrackDetails
 *
 */

import React from 'react';
// import { fireEvent } from '@testing-library/dom'
import { renderWithIntl } from '@utils/testUtils';
import TrackDetails from '../index';

describe.skip('<TrackDetails />', () => {
  it('should render and match the snapshot', () => {
    const { baseElement } = renderWithIntl(<TrackDetails />);
    expect(baseElement).toMatchSnapshot();
  });

  it('should contain 1 TrackDetails component', () => {
    const { getAllByTestId } = renderWithIntl(<TrackDetails />);
    expect(getAllByTestId('track-details').length).toBe(1);
  });
});
