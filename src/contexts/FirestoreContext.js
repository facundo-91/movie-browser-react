import { createContext, useState, useEffect, useContext } from 'react';
import { database } from '../firebase';
import { useAuth } from '../contexts/AuthContext';

// Context
const FirestoreContext = createContext(null);

// Custom Hook
const useFirestore = () => {
	return useContext(FirestoreContext);
};

// Provider
const FirestoreProvider = ({ children }) => {
	// Hooks
	const { currentUser } = useAuth();
	const [moviesWatchlist, setMoviesWatchlist] = useState([]);

	//Firestore Methods
	const addMovie = (movie_id, poster_url) => {
		database
			.collection('users')
			.doc(currentUser.uid)
			.collection('movies')
			.doc(`${movie_id}`)
			.set({ movie_id, poster_url });
	};
	const removeMovie = (id) => {
		database.collection('users').doc(currentUser.uid).collection('movies').doc(id).delete();
	};
	const onChange = (user, callback) => {
		database
			.collection('users')
			.doc(user)
			.collection('movies')
			.onSnapshot((snapshot) =>
				callback(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
			);
	};

	useEffect(() => {
		onChange(currentUser.uid, (movies) => {
			setMoviesWatchlist(movies);
		});
	}, [currentUser.uid]);

	const value = {
		addMovie,
		removeMovie,
		moviesWatchlist,
	};

	return <FirestoreContext.Provider value={value}>{children}</FirestoreContext.Provider>;
};

export { FirestoreContext as default, FirestoreProvider, useFirestore };
