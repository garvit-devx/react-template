import NotFound from '@containers/NotFoundPage/Loadable';
import HomeContainer from '@containers/HomeContainer/Loadable';
import ITunes from '@containers/ITunes/Loadable';
import ITunesDetails from '@app/containers/ITunesDetails/Loadable';
import routeConstants from '@utils/routeConstants';

export const routeConfig = {
  repos: {
    component: HomeContainer,
    ...routeConstants.repos
  },
  itunes: {
    component: ITunes,
    ...routeConstants.itunes
  },
  itunesDetails: {
    component: ITunesDetails,
    ...routeConstants.itunesDetails
  },
  notFoundPage: {
    component: NotFound,
    route: '/'
  }
};
