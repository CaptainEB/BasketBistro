import { useMutation } from '@apollo/client';
import { useState } from 'react';
import Auth from '../../utils/auth';
import { ADD_USER } from '../../utils/mutations';

export default function Signup() {
	const [formState, setFormState] = useState({ email: '', password: '', username: '' });
	const [addUser, { error, data }] = useMutation(ADD_USER);

	function handleChange(event) {
		const { name, value } = event.target;
		setFormState({
			...formState,
			[name]: value,
		});
	}

	async function handleSubmit(event) {
		event.preventDefault();
		try {
			const { data } = await addUser({
				variables: { ...formState },
			});
			Auth.login(data.addUser.token);
		} catch (e) {
			console.error(e);
		}

		setFormState({
			email: '',
			password: '',
			username: '',
		});
	}

	return (
		<section>
			<form onSubmit={handleSubmit}>
				<input value={formState.email} type="email" placeholder="Email" name="email" onChange={handleChange} />
				<input value={formState.username} type="text" placeholder="User Name" name="username" onChange={handleChange} />
				<input value={formState.password} type="password" placeholder="Password" name="password" onChange={handleChange} />
				<button type="submit">Login</button>
			</form>
			{error && <div>{error.message}</div>}
		</section>
	);
}
