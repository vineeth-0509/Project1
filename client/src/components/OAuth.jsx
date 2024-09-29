/*import {getAuth, GoogleAuthProvider, signInWithPopup} from 'firebase/auth';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';
export default function OAuth() {

    const dispatch = useDispatch();

    const handleGoogleClick = async ()=> {
        try {
            const provider = new GoogleAuthProvider()
            const auth = getAuth(app)

            const result = await signInWithPopup(auth, provider);
            console.log('Signed in user:', result.user);

            const res = await fetch('/api/auth/google',{
                    method: 'POST',
                    headers : {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name: result.user.displayName, 
                        email: result.user.email,
                        photo: result.user.photoURL,
                    }),
            });

            const data = await res.json();
            dispatch(signInSuccess(data));

        } catch (error) {
            console.log('could not sign in with google', error);
        }
    }

  return (
    <button onClick={handleGoogleClick} type='button' 
    className='bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95'>
        Continue with google</button>
  )
}

*/



import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';
import {useNavigate} from "react-router-dom"

export default function OAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
 
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);  //here we need to give the app, becoz in the firebase we exported the app. so we need to pass it here. so firebase
      //can recognize which application is creating the request. 

      // once we have both the Provider and the auth, we gonna create a pop-up request, we need to create sign-up with popup.
      const result = await signInWithPopup(auth, provider);

      const res = await fetch('/api/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });
      const data = await res.json();
      dispatch(signInSuccess(data));
      navigate("/")
    
    } catch (error) {
      console.log('could not sign in with google', error);
    }
  };
  return (
    <button
      onClick={handleGoogleClick}
      type='button'
      className='bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95'
    >
      Continue with google
    </button>
  );
}




