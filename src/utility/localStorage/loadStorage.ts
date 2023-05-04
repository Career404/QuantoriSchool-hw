export function getItems(userId: string, q?: string | null) {
	const item = localStorage.getItem(`${userId}-Items`);
	const result = item
		? JSON.parse(item)
		: [
				{
					title: 'no items in localStorage',
					isCompleted: false,
					dateDueJson: '2023-04-13T16:11:22.697Z',
					tag: 'home',
					id: '16813158826971',
				},
		  ];
	//! Filtering by search query in get localStorage function! refactor - move filtering to a separate func
	return q
		? result.filter((item: Task) =>
				item.title.toLowerCase().includes(q.toLowerCase())
		  )
		: result;
}
export function setItems(userId: string, updates: Object) {
	localStorage.setItem(`${userId}-Items`, JSON.stringify(updates));
}
export function getLastUpdated(userId: string) {
	return localStorage.getItem(`${userId}-lastUpdated`);
}
export function setLastUpdated(userId: string, date = Date.now()) {
	localStorage.setItem(`${userId}-lastUpdated`, date.toString());
}
