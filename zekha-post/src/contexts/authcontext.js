import { createContext, useContext, useEffect, useState } from 'react';
import {
        createUserWithEmailAndPassword,
        signInWithEmailAndPassword,
        signOut,
        onAuthStateChanged
    } from  'firebase/auth'
import {auth, db} from '../services/firebase'
import {doc, setDoc} from 'firebase/firestore'

const UserContext = createContext();

export const AuthContextProvider = ({children}) => {
    const [user, setUser] = useState({});

    const createUser = async (formEmail, password) => {
        const newUser = await createUserWithEmailAndPassword(auth, formEmail, password);
        const { uid, email} = newUser.user;
        await setDoc(doc(db, "accounts", uid), {
            accountInfo: {
                name: null,
                email
            }
        });
          console.log(newUser)
       return newUser;
    };

    const signIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    };

    const logout = () => {
        return signOut(auth);
    };

    useEffect(()=> {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) =>{
            setUser(currentUser)
        })
        return () => {
            unsubscribe();
        }
    }, [])

    return (
        <UserContext.Provider value={{createUser, user, logout, signIn}}>
            {children}
        </UserContext.Provider>
    )
}

export const UserAuth = () => {
    return useContext(UserContext);
}