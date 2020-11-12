import { useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const SignIn = () => {
	// Hooks
	const emailRef = useRef();
	const passwordRef = useRef();
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const { signInEmail, signInGoogle } = useAuth();
	const history = useHistory();

	// Methods
	const handleSignInEmail = async e => {
		e.preventDefault();
		try {
			setError('');
			setLoading(true);
			await signInEmail(emailRef.current.value, passwordRef.current.value);
			history.push('/');
		} catch {
			setError('Failed to Sign In');
			setLoading(false);
		}
	};
	const handleSignInGoogle = async () => {
		try {
			setError('');
			setLoading(true);
			await signInGoogle();
			history.push("/");
		} catch {
			setError('Failed to Sign In');
			setLoading(false);
	 }
 };

	return (
		<div>
			<p>Sign In</p>
			{error && <p>{error}</p>}
			<form onSubmit={handleSignInEmail}>
				<label>
					Email
					<input type='email' ref={emailRef} placeholder='Enter your email' required></input>
				</label>
				<label>
					Password
					<input type='password' ref={passwordRef} placeholder='Enter your password' required></input>
				</label>
				<button type='submit' disabled={loading}>Sign In</button>
			</form>
			<button onClick={handleSignInGoogle}>Sign In with Google</button>
			<p>Not an User? <Link to='/signup'>Sign up now</Link></p>
		</div>
	);
};

export default SignIn;