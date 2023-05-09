import { LoaderFunctionArgs } from 'react-router';

export default async function todoLoader({ request }: LoaderFunctionArgs) {
	const url = new URL(request.url);
	const q = url.searchParams.get('q');
	return { q, url };
}

export type LoaderReturnType = typeof todoLoader;

//Unable to have loaders in the same file with the component:
//it leads to HMR dying with [vite] hmr invalidate {route} Could not Fast Refresh. Learn more at https://github.com/vitejs/vite-plugin-react-swc#consistent-components-exports
//https://github.com/vitejs/vite/discussions/4577
