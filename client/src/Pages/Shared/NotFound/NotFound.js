import React from 'react';
import { useNavigate } from 'react-router-dom';
import sleeping from '../../../images/sleeping.jpg'

const NotFound = () => {
    const navigate = useNavigate();
    return (
        <div>
            <h2 className="text-primary text-center">Opp! 404! Page Not Found</h2>
            <img className="w-100" src={sleeping} alt="" />
        </div>
    );
};

export default NotFound;