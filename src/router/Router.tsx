import App from '../App';
import Chart from '../pages/Chart';
import { createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Chart />,
      },
    ],
  },
]);
