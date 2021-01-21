import { useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const UpdateUser = () => {
	// Hooks
	const userRef = useRef();
	const { currentUser, updateUser } = useAuth();
	const history = useHistory();
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);

	// Methods
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			setError('');
			setLoading(true);
			await updateUser(userRef.current.value);
			setLoading(false);
			history.push('/profile');
		} catch {
			setError('Failed to update user name');
			setLoading(false);
		}
	};

	return (
		<div className='min-h-screen px-4 pt-20 bg-gray-custom md:pt-32'>
			<div className='md:mx-auto md:max-w-2xl md:w-120'>
				<h1 className='text-4xl font-bold leading-none md:text-5xl'>Profile</h1>
				<hr className='my-2 border-gray-input-text'></hr>
				<div className='my-4'>
					{error && (
						<p className='px-5 py-2 mt-6 mb-4 text-sm font-bold rounded bg-orange-error'>{error}</p>
					)}
					<form className='mt-2' onSubmit={handleSubmit}>
						<p>
							<b>Current user name: </b>
							<span className='float-right md:ml-2 md:float-none'>
								{currentUser.displayName ? currentUser.displayName : 'User'}
							</span>
						</p>
						<div className='my-4'>
							<label className='font-bold'>New user name:</label>
							<input
								className='w-full h-12 px-5 pt-0 my-2 text-base leading-4 rounded appearance-none bg-gray-input focus:outline-none'
								id=''
								type='text'
								ref={userRef}></input>
						</div>
						<hr className='my-2 border-gray-input-text'></hr>
						<div className='flex flex-col my-2 md:flex-row md:gap-x-2'>
							<button
								className='h-12 mt-4 font-bold tracking-wider uppercase text-black-profile bg-white-custom md:w-1/2'
								type='submit'
								disabled={loading}>
								Save
							</button>
							<Link
								className='flex items-center justify-center h-12 mt-4 font-bold tracking-wider uppercase border-2 text-white-custom border-white-custom bg-gray-custom md:w-1/2'
								to='/profile'>
								Cancel
							</Link>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default UpdateUser;
