import { useQuery } from '@apollo/client';
import { GET_ME } from '../../utils/queries';
import './Profile.scss';

export default function Profile() {
	const { data, loading } = useQuery(GET_ME);
	if (loading) return <div>Loading...</div>;

	return (
		<section className="profile-section">
			<h1>
				Username: <span className="primary-color">{data?.me?.username}</span>
			</h1>
			<h2>
				Email: <span className="primary-color">{data?.me?.email}</span>
			</h2>
		</section>
	);
}
