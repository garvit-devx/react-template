/**
 *
 * Tests for ITunes container
 *
 *
 */

import React from 'react';
import { fireEvent } from '@testing-library/dom';
import { renderProvider } from '@utils/testUtils';
import { ITunesTest as ITunes } from '../index';

describe('<ITunes /> container tests', () => {
  let submitSpy;

  beforeEach(() => {
    submitSpy = jest.fn();
  });

  it('should render and match the snapshot', () => {
    const { baseElement } = renderProvider(<ITunes />);
    expect(baseElement).toMatchSnapshot();
  });

  it('should call dispatchGetTracks when search form is submitted', () => {
    const SEARCH_TERM = 'ignite';

    const { getByTestId } = renderProvider(<ITunes dispatchGetTracks={submitSpy} />);
    const searchInput = getByTestId('search-input');
    const searchForm = getByTestId('search-form');

    fireEvent.change(searchInput, {
      target: { value: SEARCH_TERM }
    });

    fireEvent.submit(searchForm);
    expect(submitSpy).toBeCalledWith(SEARCH_TERM);
  });

  it('should display correct number of results', () => {
    const resultCount = 2;
    const results = [
      {
        trackName: 'ignite',
        artistName: 'Alan Walker'
      },
      {
        trackName: 'ignite',
        artistName: 'The Chainsmokers'
      }
    ];

    const { getByTestId } = renderProvider(<ITunes dispatchGetTracks={submitSpy} tracks={{ resultCount, results }} />);
    const totalResultsElement = getByTestId('total-results');

    expect(totalResultsElement).toHaveTextContent(resultCount);
  });

  it('should render exact number of TrackCard components as in the API response', () => {
    const resultCount = 2;
    const results = [
      {
        trackName: 'ignite',
        artistName: 'Alan Walker'
      },
      {
        trackName: 'ignite',
        artistName: 'The Chainsmokers'
      }
    ];

    const { getAllByTestId } = renderProvider(
      <ITunes dispatchGetTracks={submitSpy} tracks={{ resultCount, results }} />
    );
    expect(getAllByTestId('track-card').length).toBe(resultCount);
  });
});
