import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import RootLayout from './pages/Root';
import HomePage from './pages/Home';
import ProductsPage from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import ErrorPage from './pages/Error';

import EventsPage,{loader as eventsLoader} from './pages/EventsPage';

import EventDetails,{
  loader as eventDetailLoader,
  action as deleteEventAction,
} from './pages/EventDetails'

import NewEvent from './pages/NewEvent'
import EditEvent from './pages/EditEvent'
import EventRoot from './pages/EventRoot'
import AuthenticationPage, {action as authAction} from './pages/Authentication'
import NewsletterPage, { action as newsletterAction }  from './pages/Newsletter'
import { action as manipulateEventAction } from './components/EventForm'
import {action as logoutAction} from './pages/Logout'
import { checkAuthLoader, tokenLoader} from './util/auth'

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    id: 'root',
    loader: tokenLoader,
    children: [
      { index: true, element: <HomePage /> },   
        {
          path: 'events',
          element: <EventRoot />,
          children: [
            {
              index: true,
              element: <EventsPage />,
              loader: eventsLoader,
            },
            {
              path: ':eventId',
              id: 'event-detail',
              loader: eventDetailLoader,
              children: [
                {
                  index: true,
                  element: <EventDetails />,
                  action: deleteEventAction,
                },
                { 
                  path: 'edit',
                  element: <EditEvent />,
                  action: manipulateEventAction,
                  loader: checkAuthLoader,
                },
              ],
            },
            { 
              path: 'new',
              element: <NewEvent />,
              action: manipulateEventAction,
              loader: checkAuthLoader,
            },
          ],
        },
        { path: 'products', element: <ProductsPage /> },
        { path: 'products/:productId', element: <ProductDetails /> },
        { 
          path: 'auth',
          element: <AuthenticationPage /> ,
          action:authAction
        },
        {
          path: 'newsletter',
          element: <NewsletterPage />,
          action: newsletterAction,
        },
        {
          path: 'logout',        
          action: logoutAction,
        },
    
    ],
  }
]);


function App() {
  return <RouterProvider router={router} />;
}

export default App;
