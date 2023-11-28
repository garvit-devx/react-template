import { generateApiClient } from '@utils/apiUtils';

const iTunesApi = generateApiClient('iTunes');

export const getTracks = (searchTerm) => iTunesApi.get(`/search?term=${searchTerm}`);
export const getTrackDetails = (trackId) => iTunesApi.get(`/lookup?id=${trackId}`);
