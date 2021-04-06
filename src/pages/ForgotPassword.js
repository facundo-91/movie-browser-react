import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import appLogo from '../assets/logo.png';
import background from '../assets/login-bg.png';

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
			setMessage(
				`An email with instructions on how to reset your password has been sent to ${emailRef.current.value}. Check your spam or junk folder if you don’t see the email in your inbox.`
			);
		} catch {
			setError('Failed to reset password');
			setLoading(false);
		}
	};

	return (
		<div
			className='min-h-screen pb-20 bg-cover'
			style={{
				background: window.matchMedia('(max-width: 767px)').matches
					? '#030303'
					: `linear-gradient(rgba(0, 0, 0, .5), rgba(0, 0, 0, .5)), url(${background})`,
			}}>
			<div className='flex w-full'>
				<Link to='/' className='w-8 h-8 mx-4 my-2 md:my-4 md:mx-8 md:w-12 md:h-12'>
					<img className='w-auto h-auto' src={appLogo} alt='App logo'></img>
				</Link>
			</div>
			<div className='px-5 py-4 md:bg-opacity-75 md:max-w-md md:mx-auto md:bg-black-custom md:px-16 md:py-20'>
				<h1 className='mb-4 text-3xl font-bold'>Password Reset</h1>
				{error && (
					<p className='px-5 py-2 mt-6 mb-4 text-sm font-bold rounded bg-orange-error'>{error}</p>
				)}
				{message ? (
					<p className='px-5 py-2 mt-6 mb-4 text-sm rounded bg-orange-error'>{message}</p>
				) : (
					<form className='mx-auto rounded-lg' onSubmit={handleResetPassword}>
						<div className='relative mb-4'>
							<input
								className='block w-full h-12 px-5 pt-4 text-base leading-4 rounded appearance-none bg-gray-input focus:outline-none'
								id='emailInput'
								type='email'
								ref={emailRef}
								placeholder=' '
								required></input>
							<label
								className='absolute ml-5 text-sm duration-300 top-30 cursor-text origin-0 text-gray-input-text md:text-base'
								htmlFor='emailInput'>
								Enter your email
							</label>
						</div>
						<button
							className='w-full h-12 mt-4 font-bold rounded bg-red-custom'
							type='submit'
							disabled={loading}>
							Reset Password
						</button>
					</form>
				)}
				<div className='mt-4 mb-6 text-base text-center'>
					<p className='text-base text-gray-input-text'>
						Not an User?{' '}
						<Link className='text-white-custom' to='/signup'>
							Sign up now
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
};

export default ForgotPassword;
