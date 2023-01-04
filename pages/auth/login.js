import {FcGoogle} from "react-icons/fc";  //importing icons file
import {auth} from "/utils/firebase"  // importing authenticate user from firebase
import { signInWithPopup,GoogleAuthProvider, signInWithRedirect } from "firebase/auth";  // to make user login with popup window
import { useRouter } from "next/router";  // using this to redirect user to desired page
import { useEffect } from "react"; // to check if user is logged
import {useAuthState} from "react-firebase-hooks/auth";

export default function Login(){

    const route = useRouter(); //intialising route 
    const [user,loading] = useAuthState(auth); //it will give us user data in user
    //signing user in
    const googleProvider = new GoogleAuthProvider();  //initialising google provider
    const googleLogin = async () =>{  //function for login
        try {
            const result = await signInWithPopup(auth,googleProvider);  //basically a popup window to log user in 
            route.push("/");  //redirecting user
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() =>{  
        //if user is already logged in
        //then he /she cant go to login page
        //else it will push em to home page
        if(user){
            route.push("/");
            console.log(user);
        }else{
            console.log("login");
        }
    },
    [user]);

    return(
        <div className="Login-Page">
            <h2>Join Us Today!</h2>
            <div className="Login-google">
                <h2>Sign in with one of the providers!</h2>
                <button onClick={googleLogin}> <FcGoogle size={19} className="google-logo"></FcGoogle> Sign in with Google!</button>
            </div>
        </div>
    )
}
