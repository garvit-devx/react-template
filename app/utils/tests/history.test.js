import { createBrowserHistory } from 'history';
import { getBaseUrl } from '@app/utils/history';

jest.mock('history');

describe('history tests', () => {
  beforeEach(() => {
    process.env.NODE_ENV = 'production';
  });

  it('calls createBrowserHistory with basename as empty string if isUAT returns false', () => {
    process.env.ENVIRONMENT_NAME = 'production'; // isUAT returns false

    expect(createBrowserHistory).toHaveBeenCalledWith({
      basename: ''
    });
  });

  it('calls createBrowserHistory with basename as empty string if isUAT returns true and pathname includes route', () => {
    process.env.ENVIRONMENT_NAME = 'development'; // isUAT returns true

    const pathname = '/itunes/123';
    const routeConstants = {
      itunes: {
        route: '/'
      }
    };

    const baseUrl = getBaseUrl(pathname, routeConstants);
    expect(baseUrl).toEqual('');
    expect(createBrowserHistory).toHaveBeenCalledWith({
      basename: baseUrl
    });
  });
});
