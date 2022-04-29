import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import { signOut } from 'firebase/auth';

const Order = () => {
    const [user] = useAuthState(auth);
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate()

    useEffect(() => {
        const getOrders = async () => {

            const email = user.email;
            try {
                const { data } = await axios.get(`http://localhost:5000/order?email=${email}`, {
                    headers: {
                        authorization: `Bearer ${localStorage.getItem("accessToken")}`
                    }
                });
                setOrders(data)
            } catch (error) {
                console.log(error);
                if (error.response.status === 401 || error.response.status === 403) {
                    signOut(auth);
                    navigate('/signin')
                }
            }
        }
        getOrders();

    }, [user]);

    return (
        <div>
            <h2>Your Orders: {orders.length}</h2>
        </div>
    );
};

export default Order;