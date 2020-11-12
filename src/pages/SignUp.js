import { useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const SignUp = () => {
	// Hooks
	const emailRef = useRef();
	const passwordRef = useRef();
	const passwordConfirmRef = useRef();
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const { signUpEmail } = useAuth();
	const history = useHistory();

	// Methods
	const handleSubmit = async e => {
		e.preventDefault();

		if (passwordRef.current.value !== passwordConfirmRef.current.value) {
			setLoading(false);
			return (
				setError('Passwords do not match')
			);
		};

		try {
			setError('');
			setLoading(true);
			await signUpEmail(emailRef.current.value, passwordRef.current.value);
			setLoading(false);
			history.push('/');
		} catch {
			setError('Failed to create account');
			setLoading(false);
		}
	};

	return (
		<div>
			<p>Sign Up</p>
			{error && <p>{error}</p>}
			<form onSubmit={handleSubmit}>
				<label>
					Email
					<input type='email' ref={emailRef} placeholder='Enter your email' required></input>
				</label>
				<label>
					Password
					<input type='password' ref={passwordRef} placeholder='Enter your password' required></input>
				</label>
				<label>
					Confirm Password
					<input type='password' ref={passwordConfirmRef} placeholder='Confirm your password' required></input>
				</label>
				<button disabled={loading} type='submit'>Sign Up</button>
			</form>
			<p>Already an User? <Link to='/signin'>Sign In</Link></p>
		</div>
	);
}

export default SignUp;