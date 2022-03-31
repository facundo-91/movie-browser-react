import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import defaultProfileImg from '../assets/user-profile.png';

const Profile = () => {
	const { currentUser } = useAuth();

	return (
		<div className='min-h-screen px-4 pt-20 bg-gray-custom md:pt-32'>
			<div className='md:mx-auto md:max-w-2xl md:w-120'>
				<h1 className='text-4xl font-bold leading-none md:text-5xl'>Profile</h1>
				<hr className='my-2 border-gray-input-text' />
				<div className='my-4'>
					<img
						className='w-24 mx-auto my-2'
						src={currentUser.photoURL ? currentUser.photoURL : defaultProfileImg}
						alt='User Avatar'
					/>
					<p className='text-xl font-bold text-center'>
						{currentUser.displayName ? currentUser.displayName : 'User'}
					</p>
					<p className='text-center '>{currentUser.email}</p>
				</div>
				<hr className='my-2 border-gray-input-text' />
				<div className='my-4'>
					<Link className='block text-blue-500 hover:underline' to='/update-user'>
						Change user name
					</Link>
					<Link className='block text-blue-500 hover:underline' to='/update-email'>
						Change account email
					</Link>
					<Link className='block text-blue-500 hover:underline' to='/update-password'>
						Change password
					</Link>
				</div>
				<hr className='my-2 border-gray-input-text' />
				<div className='my-4'>
					<Link
						className='flex items-center justify-center w-full h-12 mt-4 mr-2 font-bold tracking-wider uppercase md:w-48 text-white-custom bg-red-custom'
						to='/delete-account'>
						Delete Account
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Profile;
