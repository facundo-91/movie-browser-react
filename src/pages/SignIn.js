import { useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import appLogo from '../assets/logo.png';
import background from '../assets/login-bg.png';

const SignIn = () => {
	// Hooks
	const emailRef = useRef();
	const passwordRef = useRef();
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const { signInEmail, signInGoogle } = useAuth();
	const history = useHistory();

	// Methods
	const handleSignInEmail = async (e) => {
		e.preventDefault();
		try {
			setError('');
			setLoading(true);
			await signInEmail(emailRef.current.value, passwordRef.current.value);
			setLoading(false);
			history.push('/');
		} catch (err) {
			setError(err.message);
			setLoading(false);
		}
	};
	const handleSignInGoogle = async () => {
		try {
			setError('');
			setLoading(true);
			await signInGoogle();
			setLoading(false);
			history.push('/');
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
				<h1 className='mb-4 text-3xl font-bold'>Sign In</h1>
				{error && (
					<p className='px-5 py-2 mt-6 mb-4 text-sm font-bold rounded bg-orange-error'>{error}</p>
				)}
				<form className='mx-auto rounded-lg ' onSubmit={handleSignInEmail}>
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
					<button
						className='w-full h-12 mt-4 font-bold rounded bg-red-custom'
						type='submit'
						disabled={loading}>
						Sign In
					</button>
				</form>
				<div>
					<div className='flex justify-between mt-4 mb-6 space-y-1 text-base md:flex-col md:items-center'>
						<Link to='/forgot-password'>Forgot Password?</Link>
						<p className='text-base text-gray-input-text'>
							Not an User?{' '}
							<Link className='text-white-custom' to='/signup'>
								Sign up now
							</Link>
						</p>
					</div>
					<p className='text-center'>or</p>
					<button
						className='relative w-full h-12 p-px my-2 rounded bg-blue-google'
						onClick={handleSignInGoogle}>
						<svg
							viewBox='0 0 46 46'
							width='46px'
							height='46px'
							className='absolute top-0 m-px bg-white rounded'>
							<g id='Google-Button' stroke='none' strokeWidth='1' fill='none' fillRule='evenodd'>
								<g id='9-PATCH' transform='translate(-608.000000, -219.000000)'></g>
								<g id='btn_google_dark_normal' transform='translate(-1.000000, -1.000000)'>
									<g id='button' transform='translate(4.000000, 4.000000)' filter='url(#filter-1)'>
										<g id='button-bg'>
											<use fill='#4285F4' fillRule='evenodd'></use>
											<use fill='none'></use>
											<use fill='none'></use>
											<use fill='none'></use>
										</g>
									</g>
									<g id='button-bg-copy'>
										<use fill='#FFFFFF' fillRule='evenodd'></use>
										<use fill='none'></use>
										<use fill='none'></use>
										<use fill='none'></use>
									</g>
									<g id='logo_googleg_48dp' transform='translate(15.000000, 15.000000)'>
										<path
											d='M17.64,9.20454545 C17.64,8.56636364 17.5827273,7.95272727 17.4763636,7.36363636 L9,7.36363636 L9,10.845 L13.8436364,10.845 C13.635,11.97 13.0009091,12.9231818 12.0477273,13.5613636 L12.0477273,15.8195455 L14.9563636,15.8195455 C16.6581818,14.2527273 17.64,11.9454545 17.64,9.20454545 L17.64,9.20454545 Z'
											id='Shape'
											fill='#4285F4'></path>
										<path
											d='M9,18 C11.43,18 13.4672727,17.1940909 14.9563636,15.8195455 L12.0477273,13.5613636 C11.2418182,14.1013636 10.2109091,14.4204545 9,14.4204545 C6.65590909,14.4204545 4.67181818,12.8372727 3.96409091,10.71 L0.957272727,10.71 L0.957272727,13.0418182 C2.43818182,15.9831818 5.48181818,18 9,18 L9,18 Z'
											id='Shape'
											fill='#34A853'></path>
										<path
											d='M3.96409091,10.71 C3.78409091,10.17 3.68181818,9.59318182 3.68181818,9 C3.68181818,8.40681818 3.78409091,7.83 3.96409091,7.29 L3.96409091,4.95818182 L0.957272727,4.95818182 C0.347727273,6.17318182 0,7.54772727 0,9 C0,10.4522727 0.347727273,11.8268182 0.957272727,13.0418182 L3.96409091,10.71 L3.96409091,10.71 Z'
											id='Shape'
											fill='#FBBC05'></path>
										<path
											d='M9,3.57954545 C10.3213636,3.57954545 11.5077273,4.03363636 12.4404545,4.92545455 L15.0218182,2.34409091 C13.4631818,0.891818182 11.4259091,0 9,0 C5.48181818,0 2.43818182,2.01681818 0.957272727,4.95818182 L3.96409091,7.29 C4.67181818,5.16272727 6.65590909,3.57954545 9,3.57954545 L9,3.57954545 Z'
											id='Shape'
											fill='#EA4335'></path>
										<path d='M0,0 L18,0 L18,18 L0,18 L0,0 Z' id='Shape'></path>
									</g>
								</g>
								<g id='handles_square'></g>
							</g>
						</svg>
						Sign In with <b>Google</b>
					</button>
				</div>
			</div>
		</div>
	);
};

export default SignIn;
