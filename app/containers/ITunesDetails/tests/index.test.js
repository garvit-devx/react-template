/**
 *
 * Tests for ITunesDeatails container
 *
 *
 */

import React from 'react';
// import { fireEvent } from '@testing-library/dom';
import { renderProvider } from '@utils/testUtils';
import { ITunesDeatailsTest as ITunesDeatails } from '../index';

describe.skip('<ITunesDeatails /> container tests', () => {
  // let submitSpy

  beforeEach(() => {
    // submitSpy = jest.fn();
  });

  it('should render and match the snapshot', () => {
    const { baseElement } = renderProvider(<ITunesDeatails />);
    expect(baseElement).toMatchSnapshot();
  });
});
