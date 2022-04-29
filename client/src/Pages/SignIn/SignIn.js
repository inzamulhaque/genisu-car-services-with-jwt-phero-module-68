import React, { useRef } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useSignInWithEmailAndPassword, useSendPasswordResetEmail } from 'react-firebase-hooks/auth';
import { useLocation, useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';
import SocialSignIn from './SocialSignIn/SocialSignIn';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PageTitle from '../Shared/PageTitle/PageTitle';
import axios from 'axios';

const SignIn = () => {
    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);
    const [sendPasswordResetEmail, sending, resetPassError] = useSendPasswordResetEmail(auth);

    const navigate = useNavigate();
    const location = useLocation();
    const emailRef = useRef("");
    const passwordRef = useRef("");

    const from = location.state?.from?.pathname || "/";

    if (user) {
        // navigate(from, { replace: true });
    }

    const handleSubmit = async event => {
        event.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        await signInWithEmailAndPassword(email, password);
        const { data } = await axios.post("http://localhost:5000/login", { email });
        localStorage.setItem("accessToken", data.accessToken);
        navigate(from, { replace: true });
    }

    const navigateSignUp = () => {
        navigate("/signup");
    }

    const resetPassword = async () => {
        const email = emailRef.current.value;
        if (email) {
            await sendPasswordResetEmail(email);
            toast.info('Send Email', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } else {
            toast.error('Please Enter Your Email', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }

    return (
        <div className='container w-50 mx-auto'>
            <PageTitle title={"Sign In"} />
            <h2 className="text-primary mt-2">Please Sign In</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control ref={emailRef} type="email" placeholder="Enter email" required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Control ref={passwordRef} type="password" placeholder="Password" required />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Sign In
                </Button>
            </Form>

            <p>New To Genius Car? <span onClick={navigateSignUp} className="text-primary" style={{ cursor: "pointer" }}>Please Sign Up</span> </p>
            <p>Forget Password? <span onClick={resetPassword} className="text-primary" style={{ cursor: "pointer" }}>Reset Password</span> </p>
            {
                (error || resetPassError) && <p className="text-danger">Error: {error?.message || resetPassError?.message}</p>
            }

            <SocialSignIn />
            <ToastContainer />
        </div>
    );
};

export default SignIn;