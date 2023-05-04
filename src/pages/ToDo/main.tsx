import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createHashRouter, Navigate } from 'react-router-dom';

import App from './routes/App';
import Todo from '../../components/Todo/Todo';
import todoLoader from '../../components/TodoLoader';
import { NotFound } from './routes/Error';

const router = createHashRouter([
	{
		path: '/',
		element: <App />,
		errorElement: <NotFound />,
		children: [
			{
				index: true,
				element: <Navigate to="/server/" />,
			},
			{
				path: '/private',
				element: <Todo offlineInstance />,
				loader: todoLoader,
				children: [
					{
						path: '/private/*',
						element: <div>Hello there!</div>,
					},
				],
			},
			{
				path: '/server',
				element: <Todo />,
				loader: todoLoader,
				children: [
					{
						path: '/server/*',
						element: <div>Hello there!</div>,
					},
				],
			},
			{
				path: '/*',
				element: <NotFound />,
			},
		],
	},
]);

ReactDOM.createRoot(document.getElementById('app') as HTMLElement).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
