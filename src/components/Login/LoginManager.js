import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';

export const initializeLoginFrameWork = () => {
    if (firebase.apps.length === 0) {
      firebase.initializeApp(firebaseConfig);
    }
}

//Start  Google Sign IN and OUT
//SignIN
export const handleGoogleSignIn = () => {
    var googleProvider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(googleProvider)
        .then(res => {
            const { displayName, email, photoURL } = res.user;
            const signInUser = {
                isSignIn: true,
                name: displayName,
                email: email,
                photo: photoURL,
                success: true
            }
            return signInUser;

        })
        .catch(error => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode, errorMessage)
        });
}

//Facebook Sign In
export const fbSignInHandle = () => {
    var fbProvider = new firebase.auth.FacebookAuthProvider();
    return firebase.auth()
        .signInWithPopup(fbProvider)
        .then(res => {
            const user = res.user;
            user.success = true;
            return user;
        })
        .catch(error => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode, errorMessage)
        });
}

//Sign Out
export const handleSignOut = () => {
    return firebase.auth().signOut().then(() => {
        const signInUser = {
            isSignIn: false,
            name: '',
            email: '',
            photo: '',
            error:'',
            success:''
        }
        return signInUser;
    }).catch((error) => {
        console.log(error);
    });
}

//Create new user
export const createUserWithEmailAndPassword = (name,email,password) => {
    return firebase.auth().createUserWithEmailAndPassword(email,password)
        .then(res => {
            const newUserInfo = res.user;
            newUserInfo.error = '';
            newUserInfo.success = true;
            updateUserName(name);
            return newUserInfo;
        })
        .catch((error) => {
            const newUserInfo = {}
            newUserInfo.error = error.message
            newUserInfo.success = false;
            return newUserInfo;
        });
}

//Sign In old user
export const signInWithEmailAndPassword = (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email,password)
        .then(res => {
            const newUserInfo = res.user;
            newUserInfo.error = '';
            newUserInfo.success = true;
            return newUserInfo;
        })
        .catch(error => {
            const newUserInfo = {}
            newUserInfo.error = error.message
            newUserInfo.success = false;
            return newUserInfo;
        });
}

//Update User Name
const updateUserName = (name) => {
    var user = firebase.auth().currentUser;

    user.updateProfile({
        displayName: name,
    }).then(() => {
        // Update successful.
    }).catch(error => {
        console.log(error)
    });
}