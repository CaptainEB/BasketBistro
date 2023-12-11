import { useQuery } from '@apollo/client';
import { GET_LIST } from '/src/utils/queries';

export default function CurrentList() {
	const { data, loading } = useQuery(GET_LIST);
	console.log(data?.getUserList);
	if (loading) return <p>Loading...</p>;
	return <h2>hi</h2>;
}
