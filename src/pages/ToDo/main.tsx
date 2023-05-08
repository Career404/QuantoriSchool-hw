import React from 'react';
import ReactDOM from 'react-dom/client';
import { isPrivateContext } from './context/context';
import {
	RouterProvider,
	createHashRouter,
	Navigate,
	createRoutesFromElements,
	Route,
} from 'react-router-dom';
import { Provider } from 'react-redux';

import Layout from './routes/Layout';
import Todo from '../../components/Todo/Todo';
import { NotFound } from './routes/Error';
import { store } from '../../todoStore/store';

const router = createHashRouter(
	createRoutesFromElements(
		<Route path="/" element={<Layout />} errorElement={<NotFound />}>
			<Route index element={<Navigate to="/server" />} />
			<Route
				path="/private"
				element={
					<isPrivateContext.Provider value={true}>
						<Todo offlineInstance />
					</isPrivateContext.Provider>
				}
			>
				<Route path="/private/*" element={<div>Hello there!</div>} />
			</Route>
			<Route
				path="/server"
				element={
					<isPrivateContext.Provider value={false}>
						<Todo />
					</isPrivateContext.Provider>
				}
			>
				<Route path="/server/*" element={<div>Hello there!</div>} />
			</Route>
			<Route path="/*" element={<NotFound />} />
		</Route>
	)
);

ReactDOM.createRoot(document.getElementById('app') as HTMLElement).render(
	<React.StrictMode>
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	</React.StrictMode>
);
