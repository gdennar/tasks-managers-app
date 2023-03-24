import React, { useState, useEffect } from "react";
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	sendPasswordResetEmail,
	onAuthStateChanged,
	updatePassword,
	updateEmail,
	signOut,
} from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { auth } from "../firebase-config";
import { db } from "../firebase-config";

const AuthContext = React.createContext({
	currentUser: "",
	signUp: () => {},
	login: () => {},
	logout: () => {},
});

let successResponse;
let errorResponse;
export const AuthContextProvider = (props) => {
	const [currentUser, setCurrentUser] = useState(null);
	const [isError, setIsError] = useState("");
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	async function signUp(name, email, password) {
		try {
			const res = await createUserWithEmailAndPassword(auth, email, password);
			const user = res.user;
			setCurrentUser(user);
			await addDoc(collection(db, "users"), {
				uid: user.uid || null,
				displayName: name || null,
				email: user.email || null,
			});
			await user.updateProfile({
				displayName: user.displayName,
			});
		} catch (error) {
			setIsError(error.message || "Authentication falied");
		}
	}

	async function login(email, password) {
		try {
			const res = await signInWithEmailAndPassword(auth, email, password);
			const user = res.user;
			setCurrentUser(user);
			setIsLoggedIn(true);
		} catch (err) {
			setIsError(err.message);
		}
	}

	async function reset(email) {
		try {
			await sendPasswordResetEmail(auth, email);
		} catch (error) {
			const errorMessage = error.message;
			setIsError(errorMessage || "Reset falied, try again");
			console.log(errorMessage);
		}
	}

	async function logout() {
		try {
			await signOut(auth);
			setCurrentUser(null);
			setIsLoggedIn(false);
		} catch (error) {
			const errorMessage = error.message;
			setIsError(errorMessage || "Failed to log out, try again");
		}
	}

	async function updateEmailHandler(email) {
		try {
			await updateEmail(auth.currentUser, email);
		} catch (error) {
			const errorMessage = error.message;
			setIsError(errorMessage || "Failed to update, try again");
		}
	}

	async function updatePasswordHandler(password) {
		try {
			await updatePassword(auth.currentUser, password);
		} catch (error) {
			const errorMessage = error.message;
			setIsError(errorMessage || "Failed to log out, try again");
		}
	}

	useEffect(() => {
		const unsubsrcibe = onAuthStateChanged(auth, (user) => {
			setCurrentUser(user);
		});
		return () => {
			unsubsrcibe();
		};
	}, []);

	const contextValue = {
		currentUser,
		successResponse,
		errorResponse,
		isError,
		isLoggedIn,
		reset,
		signUp,
		login,
		logout,
		setIsError,
		updateEmailHandler,
		updatePasswordHandler,
	};

	return (
		<AuthContext.Provider value={contextValue}>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthContext;
