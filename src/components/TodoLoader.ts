import { LoaderFunctionArgs } from 'react-router';
import { getItems } from '../utility/localStorage/loadStorage';
import { AUTH, GENERIC_USER_ID } from '../utility/auth/auth';
export default async function todoLoader({ request }: LoaderFunctionArgs) {
	const url = new URL(request.url);
	console.log('todoLoaderTriggered:', url);
	const q = url.searchParams.get('q');
	const id = url.href.includes('server') ? AUTH : GENERIC_USER_ID;
	const items: Task[] = await getItems(id, q);
	return { items, q, id };
}

export type TodoLoader = typeof todoLoader;

//Unable to have loaders in the same file with the component:
//it leads to HMR dying with [vite] hmr invalidate {route} Could not Fast Refresh. Learn more at https://github.com/vitejs/vite-plugin-react-swc#consistent-components-exports
//https://github.com/vitejs/vite/discussions/4577
