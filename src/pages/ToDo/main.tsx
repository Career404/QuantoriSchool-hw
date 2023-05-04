import React, { Children } from 'react';
import ReactDOM from 'react-dom/client';

import {
	RouterProvider,
	createHashRouter,
	Route,
	createRoutesFromElements,
} from 'react-router-dom';
import Todo from '../../components/Todo/Todo';

import getAuth from '../../utility/auth/auth';

import App from './routes/App';
import { NotFound } from './routes/Error';

const auth = getAuth();

const router = createHashRouter([
	{
		path: '/',
		element: <App />,
		errorElement: <NotFound />,
		children: [
			{
				path: '/private',
				element: <Todo offlineInstance />,
				children: [
					{
						path: '/private/*',
						element: <div>Hello there!</div>,
					},
				],
			},
			{
				path: '/server',
				element: <Todo userId={auth} />,
				children: [
					{
						path: '/server/*',
						element: <div>Hello there!</div>,
					},
				],
			},
		],
	},
]);

ReactDOM.createRoot(document.getElementById('app') as HTMLElement).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
