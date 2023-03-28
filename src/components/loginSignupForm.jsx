import { useRef, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LoginSignUpForm({ signInGoogle }) {
  const [isSignIn, setIsSignIn] = useState(true);

  const navigate = useNavigate();

  const Refs = {
    firstNameRef: useRef(),
    lastNameRef: useRef(),
    signInEmailRef: useRef(),
    signInPasswordRef: useRef(),
    signUpEmailRef: useRef(),
    signUpPasswordRef: useRef(),
  };

  const handleSignInSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = {
        email: Refs.signInEmailRef.current.value,
        password: Refs.signInPasswordRef.current.value,
      };

      await axios.post('http://localhost:7000/login', user, {
        withCredentials: true,
      });

      navigate('/profile');
    } catch (err) {
      console.log(err);
    }
  };

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = {
        source: 'self',
        firstName: Refs.firstNameRef.current.value,
        lastName: Refs.lastNameRef.current.value,
        email: Refs.signUpEmailRef.current.value,
        password: Refs.signUpPasswordRef.current.value,
      };
      await axios.post('http://localhost:7000/signup', user, {
        withCredentials: true,
      });
      navigate('/profile');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bg-white w-full mx-4 rounded shadow-md h-3/4 md:w-3/4 lg:w-1/2 p-4">
      <div className="w-full h-10 items-center gap-2 flex">
        <div
          onClick={() => setIsSignIn(false)}
          className={`w-1/2 text-center border cursor-pointer p-4 rounded-md font-semibold duration-300 ${
            !isSignIn && 'bg-red-400 text-white'
          }`}
        >
          Sign Up
        </div>
        <div
          onClick={() => setIsSignIn(true)}
          className={`w-1/2 rounded-md font-semibold duration-300 text-center border cursor-pointer p-4 ${
            isSignIn && 'bg-red-400 text-white'
          }`}
        >
          Sign In
        </div>
      </div>
      <div className="w-full flex flex-col gap-4 justify-center items-center h-full">
        {isSignIn ? (
          <SignIn Refs={Refs} handleSignInSubmit={handleSignInSubmit} />
        ) : (
          <SignUp Refs={Refs} handleSignUpSubmit={handleSignUpSubmit} />
        )}
        <button
          onClick={signInGoogle}
          className="w-full p-2 rounded-md bg-blue-400 flex justify-center items-center gap-2 font-semibold text-lg text-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-google"
            viewBox="0 0 16 16"
          >
            <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" />
          </svg>
          {isSignIn ? 'Sign in with Google' : 'Sign up with Google'}
        </button>
      </div>
    </div>
  );
}

export default LoginSignUpForm;

const SignUp = ({ handleSignUpSubmit, Refs }) => (
  <form onSubmit={handleSignUpSubmit} className="w-full flex flex-col gap-4">
    <input
      ref={Refs.firstNameRef}
      type="text"
      placeholder="First Name"
      className="w-full px-4 py-2 border rounded-md"
    />
    <input
      ref={Refs.lastNameRef}
      type="text"
      placeholder="Last Name"
      className="w-full px-4 py-2 border rounded-md"
    />
    <input
      ref={Refs.signUpEmailRef}
      type="email"
      placeholder="Email"
      className="w-full px-4 py-2 border rounded-md"
    />
    <input
      ref={Refs.signUpPasswordRef}
      type="password"
      placeholder="Password"
      className="w-full px-4 py-2 border rounded-md"
    />

    <button
      type="submit"
      className="p-2 rounded-md bg-green-400 flex justify-center items-center gap-2 font-semibold text-lg text-white"
    >
      Submit
    </button>
  </form>
);

const SignIn = ({ handleSignInSubmit, Refs }) => (
  <form onSubmit={handleSignInSubmit} className="w-full flex flex-col gap-4">
    <input
      ref={Refs.signInEmailRef}
      type="email"
      placeholder="Email"
      className="w-full px-4 py-2 border rounded-md"
    />
    <input
      ref={Refs.signInPasswordRef}
      type="password"
      placeholder="Password"
      className="w-full px-4 py-2 border rounded-md"
    />

    <button
      type="submit"
      className="p-2 rounded-md bg-green-400 flex justify-center items-center gap-2 font-semibold text-lg text-white"
    >
      Submit
    </button>
  </form>
);
