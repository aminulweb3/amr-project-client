import React, { createContext, useState, useEffect } from "react";
import { auth } from "../firebase/firebase.config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
  signInWithRedirect
} from "firebase/auth";
import useAxiosPublic from "../hook/useAxiosPublic";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const axiosPublic =useAxiosPublic();

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    const googleSignIn = () => {
        setLoading(true);
        const googleProvider = new GoogleAuthProvider();
        return signInWithPopup(auth, googleProvider);
    };

    const updateUserProfile = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photo
        });
    };

    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    };

    useEffect(() => {
        let tokenTimer;
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            if (currentUser) {
                clearTimeout(tokenTimer);
                tokenTimer = setTimeout(() => {
                    axiosPublic.post('/jwt', { email: currentUser.email })
                        .then(res => {
                            localStorage.setItem('access-token', res.data.token);
                        })
                        .catch(error => {
                            console.error('Error generating JWT:', error);
                        });
                }, 1000); // Wait for 1 second before generating token
            } else {
                localStorage.removeItem('access-token');
            }
            setLoading(false);
        });

        return () => {
            unsubscribe();
            clearTimeout(tokenTimer);
        };
    }, [axiosPublic]);

    const authInfo = {
        user,
        setUser, // Add this
        loading,
        createUser,
        signIn,
        googleSignIn,  // Make sure this is included
        updateUserProfile,
        logOut,
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider; 