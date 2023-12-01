/**
 *
 * Tests for ITunes container
 *
 *
 */

import React from 'react';
import { fireEvent } from '@testing-library/dom';
import { renderProvider } from '@utils/testUtils';
import { ITunesTest as ITunes } from '@app/containers/ITunes/index';

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

    const { getByPlaceholderText, getByRole } = renderProvider(<ITunes dispatchGetTracks={submitSpy} />);
    const searchInput = getByPlaceholderText('Search any track');
    const searchForm = getByRole('form');

    fireEvent.change(searchInput, {
      target: { value: SEARCH_TERM }
    });

    fireEvent.submit(searchForm);
    expect(submitSpy).toBeCalledWith(SEARCH_TERM);
  });

  it('should display correct number of results', () => {
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
    const resultCount = results.length;

    const { getByText } = renderProvider(<ITunes dispatchGetTracks={submitSpy} tracks={{ resultCount, results }} />);
    const totalResultsElement = getByText(new RegExp('total result', 'i'));

    expect(totalResultsElement).toHaveTextContent(resultCount);
  });

  it('should render exact number of TrackCard components as in the API response', () => {
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
    const resultCount = results.length;

    const { getAllByRole } = renderProvider(<ITunes dispatchGetTracks={submitSpy} tracks={{ resultCount, results }} />);
    expect(getAllByRole('track-card').length).toBe(resultCount);
  });
});
