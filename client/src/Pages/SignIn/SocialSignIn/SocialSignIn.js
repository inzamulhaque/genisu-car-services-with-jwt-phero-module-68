import { Button } from 'react-bootstrap';
import React from 'react';
import googleIcon from '../../../images/socialIcon/google.png';
import githubIcon from '../../../images/socialIcon/github.png';
import facebookIcon from '../../../images/socialIcon/facebook.png';
import { useSignInWithGithub, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';
import { useLocation, useNavigate } from 'react-router-dom';

const SocialSignIn = () => {
    const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
    const [signInWithGithub, gitHunUser, gitHubLoading, gitHubError] = useSignInWithGithub(auth);

    const navigate = useNavigate();
    const location = useLocation();

    if (loading || gitHubLoading) {
        return <p>Loading</p>;
    }

    const from = location.state?.from?.pathname || "/";

    // if (error) {
    //     return <p className="text-danger">Error: {error.message}</p>
    // }

    if (user || gitHunUser) {
        navigate(from, { replace: true });
    }

    return (
        <div>
            <div className='d-flex align-items-center'>
                <div style={{ height: "1px" }} className="bg-primary w-50"></div>
                <p className="mt-2 px-2">OR</p>
                <div style={{ height: "1px" }} className="bg-primary w-50"></div>
            </div>
            <div className="">
                <Button onClick={() => signInWithGoogle()} variant="danger" className="w-50 mx-auto d-block my-2">
                    <img width="30" src={googleIcon} alt="Google Icon" />
                    <span className="px-2">Google Sign In</span>
                </Button>
                <Button onClick={() => signInWithGithub()} variant="dark" className="w-50 mx-auto d-block my-2">
                    <img style={{ background: "#fff" }} width="30" src={githubIcon} alt="GitHub Icon" />
                    <span className="px-2">GitHub Sign In</span>
                </Button>
                <Button variant="outline-primary" className="w-50 mx-auto d-block my-2">
                    <img width="30" src={facebookIcon} alt="Facebook Icon" />
                    <span className="px-2">Facebook Sign In</span>
                </Button>
                {
                    (error || gitHubError) && <p className="text-danger text-center">Error: {error?.message || gitHubError?.message}</p>
                }
            </div>
        </div>
    );
};

export default SocialSignIn;