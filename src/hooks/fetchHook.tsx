export default async function useFetch(uri: string) {
	let data
	const response = await fetch(uri)
	data = await response.json()

	return data.products
}
