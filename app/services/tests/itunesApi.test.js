import MockAdapter from 'axios-mock-adapter';
import { getApiClient } from '@app/utils/apiUtils';
import { getTracks, getTrackDetails } from '../itunesApi';

describe('Tests for iTunes Api', () => {
  it('should make a request to "/search?term="', async () => {
    const searchTerm = 'ignite';
    const data = {
      resultCount: 1,
      results: [
        {
          trackName: 'ignite',
          artistName: 'Alan Walker',
          previewUrl: 'Some URL'
        }
      ]
    };
    const mock = new MockAdapter(getApiClient('iTunes').axiosInstance);
    mock.onGet(`/search?term=${searchTerm}&media=music`).reply(200, data);
    const apiResponse = await getTracks(searchTerm);
    expect(apiResponse.data).toEqual(data);
  });

  it('should make a request to "/lookup?id="', async () => {
    const trackId = 12345;
    const data = {
      resultCount: 1,
      results: [
        {
          trackName: 'ignite',
          artistName: 'Alan Walker',
          previewUrl: 'Some URL'
        }
      ]
    };
    const mock = new MockAdapter(getApiClient('iTunes').axiosInstance);
    mock.onGet(`/lookup?id=${trackId}`).reply(200, data);
    const apiResponse = await getTrackDetails(trackId);
    expect(apiResponse.data).toEqual(data);
  });
});
