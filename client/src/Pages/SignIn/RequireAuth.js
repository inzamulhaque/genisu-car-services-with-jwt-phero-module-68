import React from 'react';
import { useAuthState, useSendEmailVerification } from 'react-firebase-hooks/auth';
import { Navigate, useLocation } from 'react-router-dom';
import auth from '../../firebase.init';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RequireAuth = ({ children }) => {
    const [user, loadind] = useAuthState(auth);
    const [sendEmailVerification, sending, error] = useSendEmailVerification(auth);
    const location = useLocation();

    const sendVerificationEmail = async () => {
        await sendEmailVerification();
        toast.info('Check Your Email', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }

    if (loadind) {
        return <p>Loading...</p>;
    }

    if (!user) {
        return <Navigate to="/signin" state={{ from: location }} replace />;
    }

    if (user.providerData[0]?.providerId === 'password' && !user.emailVerified) {
        return <div className='text-center'>
            <h1 className="text-danger">Your Email Not Verified! Please Verify Your Email.</h1>
            <button onClick={sendVerificationEmail} className="btn btn-success">Send Verification Email</button>
            <ToastContainer />
        </div>;
    }

    return children;
};

export default RequireAuth;