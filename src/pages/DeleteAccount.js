import { useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const DeleteAccount = () => {
	// Hooks
	const currentPasswordRef = useRef();
	const { deleteUser, currentUser, reAuth } = useAuth();
	const history = useHistory();
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);

	// Methods
	const handleDelete = async (e) => {
		e.preventDefault();
		try {
			setError('');
			setLoading(true);
			let credentials = reAuth(currentUser.email, currentPasswordRef.current.value);
			await currentUser.reauthenticateWithCredential(credentials);
			await deleteUser();
			setLoading(false);
			history.push('/');
		} catch (err) {
			setError(err.message);
			setLoading(false);
		}
	};

	return (
		<div className='min-h-screen px-4 pt-20 bg-gray-custom md:pt-32'>
			<div className='md:mx-auto md:max-w-2xl md:w-120'>
				<h1 className='text-4xl font-bold leading-none md:text-5xl'>Profile</h1>
				<hr className='my-2 border-gray-input-text'></hr>
				<form className='my-4' onSubmit={handleDelete}>
					<p className='mb-4 font-bold'>Are you sure you want to delete your account?</p>
					{error && (
						<p className='px-5 py-2 mt-6 mb-4 text-sm font-bold rounded bg-orange-error'>{error}</p>
					)}
					<div className='my-4'>
						<label className='font-bold'>
							Password:
							<input
								className='w-full h-12 px-5 pt-0 mt-2 text-base leading-4 rounded appearance-none bg-gray-input focus:outline-none'
								type='password'
								required
								ref={currentPasswordRef}></input>
						</label>
					</div>
					<hr className='my-2 border-gray-input-text'></hr>
					<div className='flex flex-col my-2 md:flex-row md:gap-x-2'>
						<button
							className='h-12 mt-4 font-bold tracking-wider uppercase text-white-custom bg-red-custom md:w-1/2'
							type='submit'
							disabled={loading}>
							Yes
						</button>
						<Link
							className='flex items-center justify-center h-12 mt-4 font-bold tracking-wider uppercase text-gray-custom bg-white-custom md:w-1/2'
							to='/profile'>
							No
						</Link>
					</div>
				</form>
			</div>
		</div>
	);
};
export default DeleteAccount;
