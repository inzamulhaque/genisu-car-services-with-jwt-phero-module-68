import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useCreateUserWithEmailAndPassword, useUpdateProfile } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import SocialSignIn from './SocialSignIn/SocialSignIn';
import PageTitle from '../Shared/PageTitle/PageTitle';

const SignUp = () => {
    const [agree, setAgree] = useState(false)
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth, { sendEmailVerification: true });

    const [updateProfile, updating, updateError] = useUpdateProfile(auth);

    const navigate = useNavigate();

    const navigateSignIn = () => {
        navigate("/signin");
    }

    if (loading || updating) {
        return <p>Loading</p>;
    }

    // if (user) {
    //     navigate("/signin");
    // }

    const handleSignUp = async (event) => {
        event.preventDefault();
        const name = event.target.name.value;
        const email = event.target.email.value;
        const password = event.target.password.value;
        // const agree = event.target.terms.checked;

        // if (agree) {
        //     createUserWithEmailAndPassword(email, password);
        // }

        await createUserWithEmailAndPassword(email, password);
        await updateProfile({ displayName: name });
        navigate("/signin");
    }

    return (
        <div className='container w-50 mx-auto'>
            <PageTitle title={"Sign Up"} />
            <h2 className="text-primary">Sign Up</h2>
            <Form onSubmit={handleSignUp}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Name</Form.Label>
                    <Form.Control name="name" type="text" placeholder="Enter name" required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control name="email" type="email" placeholder="Enter email" required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control name="password" type="password" placeholder="Password" required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check onClick={(event) => setAgree(event.target.checked)} className={agree ? "text-success" : "text-danger"} name="terms" type="checkbox" label="Accept Terms And Condition" required />
                </Form.Group>
                <Button disabled={!agree} variant="primary" type="submit">
                    Sign Up
                </Button>
            </Form>
            <p>Already Have An Account? <span onClick={navigateSignIn} className="text-primary" style={{ cursor: "pointer" }}>Please Sign In</span> </p>
            {
                error && <p className="text-danger">Error: {error.message}</p>
            }
            <SocialSignIn />
        </div>
    );
};

export default SignUp;