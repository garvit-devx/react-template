import { createBrowserHistory } from 'history';
import routeConstants from '@utils/routeConstants';
import { isUAT } from './index';

const pathname = window.location.pathname;

export function getBaseUrl(pathName, routeConstants) {
  let baseUrl = '';
  const routes = Object.keys(routeConstants);

  if (isUAT()) {
    routes.forEach((routeKey) => {
      const route = routeConstants[routeKey].route;
      if (pathName.includes(route)) {
        if (pathName.substring(pathName.length - route.length, pathName.length) === route) {
          baseUrl = pathName.substring(0, pathName.length - route.length);
        }
        if (pathName.substring(pathName.length - route.length, pathName.length - 1) === `${route}/`) {
          baseUrl = pathName.substring(0, pathName.length - route.length - 1);
        }
      }
    });
  }

  return baseUrl;
}

const history = createBrowserHistory({ basename: getBaseUrl(pathname, routeConstants) });
export default history;
