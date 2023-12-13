import { useQuery } from '@apollo/client';
import { GET_ME } from '../../utils/queries';

export default function Profile() {
	const { data, loading } = useQuery(GET_ME);
	if (loading) return <div>Loading...</div>;

	return (
		<section>
			<h1>{data?.me?.username}</h1>
			<h2>{data?.me?.email}</h2>
		</section>
	);
}
