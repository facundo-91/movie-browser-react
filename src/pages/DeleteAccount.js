import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useFirestore } from '../contexts/FirestoreContext';

const DeleteAccount = () => {
	// Hooks
	const { deleteUser } = useAuth();
	const { removeAlldata } = useFirestore();
	const history = useHistory();
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);

	// Methods
	const handleDelete = async () => {
		try {
			setError('');
			setLoading(true);
			await deleteUser();
			await removeAlldata();
			history.push('/');
		} catch {
			setError('Failed to delete account');
			setLoading(false);
		}
	};

	return (
		<div className='min-h-screen px-4 pt-20 bg-gray-custom md:pt-32'>
			<div className='md:mx-auto md:max-w-2xl md:w-120'>
				<h1 className='text-4xl font-bold leading-none md:text-5xl'>Profile</h1>
				<hr className='my-2 border-gray-input-text'></hr>
				<div className='my-4'>
					<p className='mb-4 font-bold'>Are you sure you want to delete your account?</p>
					{error && (
						<p className='px-5 py-2 mt-6 mb-4 text-sm font-bold rounded bg-orange-error'>{error}</p>
					)}
					<hr className='my-2 border-gray-input-text'></hr>
					<div className='flex flex-col my-2 md:flex-row md:gap-x-2'>
						<button
							onClick={handleDelete}
							className='h-12 mt-4 font-bold tracking-wider uppercase text-white-custom bg-red-custom md:w-1/2'
							disabled={loading}>
							Yes
						</button>
						<Link
							className='flex items-center justify-center h-12 mt-4 font-bold tracking-wider uppercase text-gray-custom bg-white-custom md:w-1/2'
							to='/profile'>
							No
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};
export default DeleteAccount;
