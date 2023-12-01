import MockAdapter from 'axios-mock-adapter';
import { getApiClient } from '@app/utils/apiUtils';
import { getTracks } from '../itunesApi';

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
});
