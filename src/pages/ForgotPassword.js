import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ForgotPassword = () => {
	// Hooks
	const emailRef = useRef();
	const [error, setError] = useState('');
	const [message, setMessage] = useState('');
	const [loading, setLoading] = useState(false);
	const { resetPassword } = useAuth();

	// Methods
	const handleResetPassword = async (e) => {
		e.preventDefault();
		try {
			setError('');
			setMessage('');
			setLoading(true);
			await resetPassword(emailRef.current.value);
			setMessage('Check your Inbox for further instructions');
		} catch {
			setError('Failed to reset password');
			setLoading(false);
		}
	};

	return (
		<div>
			<p>Password Reset</p>
			{error && <p>{error}</p>}
			{message && <p>{message}</p>}
			<form onSubmit={handleResetPassword}>
				<label>
					Email
					<input type='email' ref={emailRef} placeholder='Enter your email' required></input>
				</label>
				<button type='submit' disabled={loading}>
					Reset Password
				</button>
			</form>
			<p>
				Not an User? <Link to='/signup'>Sign up now</Link>
			</p>
		</div>
	);
};

export default ForgotPassword;
