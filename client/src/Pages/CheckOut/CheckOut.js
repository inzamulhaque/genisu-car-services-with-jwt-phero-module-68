import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useParams } from 'react-router-dom';
import useServiceDetail from '../../hooks/useServiceDetail';
import PageTitle from '../Shared/PageTitle/PageTitle';
import auth from '../../firebase.init';
import axios from 'axios';

const CheckOut = () => {
    const [user] = useAuthState(auth);
    const { serviceId } = useParams();
    const [service] = useServiceDetail(serviceId);

    // const [user, setUser] = useState({
    //     name: 'Akbar The Great',
    //     email: 'akbar@momo.taj',
    //     address: 'Tajmohol Road Md.pur',
    //     phone: '01711111111'
    // });

    // const handleAddressChange = event =>{
    //     console.log(event.target.value);
    //     const {address, ...rest} = user;
    //     const newAddress = event.target.value;
    //     const newUser = {address: newAddress, ...rest};
    //     console.log(newUser);
    //     setUser(newUser);
    // }

    const handlePlaceOrder = event => {
        event.preventDefault();
        const order = {
            email: user.email,
            service: service.name,
            serviceId,
            address: event.target.address.value,
            phone: event.target.phone.value
        }

        axios.post("http://localhost:5000/order", order)
            .then(response => {
                const { data } = response;
                if (data.insertedId) {
                    alert("Order Recived");
                    event.target.reset();
                }
            });
    }

    return (
        <div className='w-50 mx-auto'>
            <PageTitle title={"CheckOut"} />
            <h2>Checkout Page</h2>
            <h3>Name: {service.name}</h3>
            <form onSubmit={handlePlaceOrder}>
                <input className="w-100 mb-2" type="text" name="name" placeholder='Enter Your Name' value={user?.displayName} required readOnly disabled />
                <br />
                <input className="w-100 mb-2" type="email" name="email" placeholder='Enter Your Email' value={user?.email} required readOnly disabled />
                <br />
                <input className="w-100 mb-2" type="text" name="service" placeholder='Service' value={service.name} required readOnly />
                <br />
                <input className="w-100 mb-2" type="text" name="address" placeholder='Enter Your Address' required autoComplete='off' />
                <br />
                <input className="w-100 mb-2" type="number" name="phone" placeholder='Enter Your Phone Number' required autoComplete='off' />
                <br />
                <input className='btn btn-primary' type="submit" value="CheckOut" />
            </form>
        </div>
    );
};

export default CheckOut;