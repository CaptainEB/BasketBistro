import { useMutation } from '@apollo/client';
import { useState } from 'react';
import Auth from '../../utils/auth';
import { LOGIN_USER } from '../../utils/mutations';

export default function Login() {
	const [formState, setFormState] = useState({ email: '', password: '' });
	const [login, { error, data }] = useMutation(LOGIN_USER);

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
			const { data } = await login({
				variables: { ...formState },
			});

			Auth.login(data.login.token);
		} catch (e) {
			console.error(e);
		}

		// clear form values
		setFormState({
			email: '',
			password: '',
		});
	}

	return (
		<section>
			<form onSubmit={handleSubmit}>
				<input value={formState.email} type="email" placeholder="Email" name="email" onChange={handleChange} />
				<input value={formState.password} type="password" placeholder="Password" name="password" onChange={handleChange} />
				<button type="submit">Login</button>
			</form>
		</section>
	);
}
