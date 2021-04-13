import { useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import appLogo from '../assets/logo.png';
import background from '../assets/login-bg.png';

const SignUp = () => {
	// Hooks
	const emailRef = useRef();
	const passwordRef = useRef();
	const passwordConfirmRef = useRef();
	const { signUpEmail } = useAuth();
	const history = useHistory();
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);

	// Methods
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			setError('');
			setLoading(true);
			if (passwordRef.current.value !== passwordConfirmRef.current.value) {
				setLoading(false);
				setError('Passwords do not match');
			} else {
				await signUpEmail(emailRef.current.value, passwordRef.current.value);
				setLoading(false);
				history.push('/');
			}
		} catch (err) {
			setError(err.message);
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
				<h1 className='mb-4 text-3xl font-bold'>Sign Up</h1>
				{error && (
					<p className='px-5 py-2 mt-6 mb-4 text-sm font-bold rounded bg-orange-error'>{error}</p>
				)}
				<form className='mx-auto rounded-lg' onSubmit={handleSubmit}>
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
					<div className='relative mb-4'>
						<input
							className='block w-full h-12 px-5 pt-4 text-base leading-4 rounded appearance-none bg-gray-input focus:outline-none'
							id='passwordInput'
							type='password'
							ref={passwordRef}
							placeholder=' '
							required></input>
						<label
							className='absolute ml-5 text-sm duration-300 top-30 cursor-text origin-0 text-gray-input-text md:text-base'
							htmlFor='passwordInput'>
							Enter your password
						</label>
					</div>
					<div className='relative mb-4'>
						<input
							className='block w-full h-12 px-5 pt-4 text-base leading-4 rounded appearance-none bg-gray-input focus:outline-none'
							id='passwordConfirmInput'
							type='password'
							ref={passwordConfirmRef}
							placeholder=' '
							required></input>
						<label
							className='absolute ml-5 text-sm duration-300 top-30 cursor-text origin-0 text-gray-input-text md:text-base'
							htmlFor='passwordConfirmInput'>
							Confirm your password
						</label>
					</div>
					<button
						className='w-full h-12 mt-4 font-bold rounded bg-red-custom'
						type='submit'
						disabled={loading}>
						Sign Up
					</button>
				</form>
				<div className='mt-4 mb-6 text-base text-center'>
					<p className='text-base text-gray-input-text'>
						Already an User?{' '}
						<Link className='text-white-custom' to='/signin'>
							Sign In
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
};

export default SignUp;
