import { createContext, useState, useEffect, useContext } from 'react';
import { auth, providers, firebase } from '../firebase';

// Context
const AuthContext = createContext(null);

// Custom Hook
const useAuth = () => {
	return useContext(AuthContext);
};

// Provider
const AuthProvider = ({ children }) => {
	// States
	const [currentUser, setCurrentUser] = useState(null);
	const [loading, setLoading] = useState(true);

	// Firebase Methods
	const signUpEmail = (email, password) => auth.createUserWithEmailAndPassword(email, password);
	const signInEmail = (email, password) => auth.signInWithEmailAndPassword(email, password);
	const signInGoogle = () => auth.signInWithPopup(providers.google);
	const signOut = () => auth.signOut();
	const resetPassword = (email) => auth.sendPasswordResetEmail(email);
	const updateEmail = (email) => currentUser.updateEmail(email);
	const updatePassword = (password) => currentUser.updatePassword(password);
	const updateUser = (username) => currentUser.updateProfile({ displayName: username });
	const deleteUser = () => currentUser.delete();
	const reAuth = (email, password) => firebase.auth.EmailAuthProvider.credential(email, password);

	// Subscribe to user on mount
	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
			setCurrentUser(user);
			setLoading(false);
		});
		// Cleanup subscription on unmount
		return unsubscribe;
	}, []);

	// User object and auth methods to pass to the Provider
	const value = {
		currentUser,
		signUpEmail,
		signInEmail,
		signInGoogle,
		signOut,
		resetPassword,
		updateEmail,
		updatePassword,
		updateUser,
		deleteUser,
		reAuth,
	};

	return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
};

export { AuthContext as default, AuthProvider, useAuth };
