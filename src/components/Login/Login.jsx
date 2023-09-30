import { GithubAuthProvider, GoogleAuthProvider, getAuth, signInWithPopup, signOut } from "firebase/auth";
import app from "../../firebase/firebase.init";
import { useState } from "react";

const Login = () => {
    const [user, setUser] = useState(null);

    const auth = getAuth(app);
    
    const googleProvider = new GoogleAuthProvider();
    const gitHubProvider = new GithubAuthProvider();
    
    // log in with google
    const handleGoogleSignIn = () => {
        signInWithPopup(auth, googleProvider)
            .then(result => {
                const userDetails = result.user;
                setUser(userDetails);
                console.log(userDetails);
            })
            .catch(error => {
                console.log(error);
            })
    };

    // log in with github
    const handleGitHubSignIn = () => {
        signInWithPopup(auth, gitHubProvider)
        .then(result => {
            const userDetails = result.user;
            setUser(userDetails);
        })
        .catch(error => console.log(error.message));
    };

    const handleSignOut = () => {
        signOut(auth)
            .then(() => setUser(null))
            .catch(error => console.log(error.message));
    };

    return (
        <div>
            <div>
                {user
                    ? <button onClick={handleSignOut} className="btn btn-primary normal-case">LogOut</button>
                    : 
                    <>
                    <button onClick={handleGoogleSignIn} className="btn btn-primary normal-case mr-2">Login with Google</button>
                    <button onClick={handleGitHubSignIn} className="btn btn-primary normal-case">Login with GitHub</button>
                    </>
                }
            </div>
            {user &&
            <div className="my-5 text-center">
                <img className="inline-block rounded-full" src={user.photoURL} alt="profile-photo" />
                <h1 className="text-4xl">{user.displayName}</h1>
                <p>{user?.email}</p>
            </div>
            }
        </div>
    );
};

export default Login;