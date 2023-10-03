import React from "react";
import Header from "./Header";
import { useState, useRef } from "react";
import { checkvalidData } from "../utils/validator";
import { auth } from "../utils/firbase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { USERAVATAR } from "../utils/constants";
import {BG_IMG} from "../utils/constants"

const Login = () => {
  const [isSignInForm, setIsSignInFrom] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch();

  const toggleSignInForm = () => {
    setIsSignInFrom(!isSignInForm);
  };

  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);

  const handleButtonClick = () => {
    console.log("handleButtonClick");
    // validate the form data
    const message = checkvalidData(
      email.current?.value,
      password.current?.value,
      name.current?.value
    );
    console.log(message);
    setErrorMessage(message);

    // if (message === null){}
    // or
    if (message) return;

    // sign in and sign up logic
    // signUp logic
    if (!isSignInForm) {
      createUserWithEmailAndPassword(
        auth,
        email.current?.value,
        password.current?.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
            photoURL: USERAVATAR,
          })
            .then(() => {
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
              // Profile updated!
              // ...
              console.log("signup", user);
            })
            .catch((error) => {
              setErrorMessage(error.message);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(error.code + ":" + error.message);
        });
    } else {
      // signin logic
      signInWithEmailAndPassword(
        auth,
        email.current?.value,
        password.current?.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log("signin", user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(error.code + ":" + error.message);
        });
    }
  };

  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          src={BG_IMG}
          alt="bgImage"
        />
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        action=""
        className="w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80"
      >
        <h1 className="font-bold text-3xl py-4">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInForm && (
          <input
            ref={name}
            type="text"
            placeholder="Full Name"
            className="p-4 my-4 w-full bg-gray-700"
          />
        )}
        <input
          ref={email}
          type="text"
          placeholder="Email Addresss"
          className="p-4 my-4 w-full bg-gray-700"
        />
        <input
          ref={password}
          type="password"
          placeholder="password"
          className="p-4 my-4 w-full bg-gray-700"
        />
        <p className="text-red-500 font-bold text-lg py-2">{errorMessage}</p>
        <button
          className="p-4 my-6 bg-red-700 w-full rounded-lg"
          onClick={handleButtonClick}
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <p className="py-4 cursor-pointer" onClick={toggleSignInForm}>
          {isSignInForm
            ? "New to Netflix Sign Up Now!"
            : "Already registered Sign In now"}
        </p>
      </form>
    </div>
  );
};

export default Login;
