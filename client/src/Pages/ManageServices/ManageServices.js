import React from 'react';
import useServices from '../../hooks/useServices';

const ManageServices = () => {
    const [services, setServices] = useServices();

    const handleDelete = (id, name) => {
        const proceed = window.confirm(`are you sure? you want to delete ${name}`);
        if (proceed) {
            fetch(`http://localhost:5000/service/${id}`, {
                method: "DELETE"
            })
                .then(res => res.json())
                .then(data => {
                    const remaining = services.filter(service => service._id !== id);
                    setServices(remaining);
                });
        }
    }

    return (
        <div className='w-50 mx-auto'>
            <h2>Manage Your Services</h2>
            {
                services.map(service => <div key={service._id}>
                    <h4>
                        {service.name} {" "}
                        <button onClick={() => handleDelete(service._id, service.name)}>X</button>
                    </h4>
                </div>)
            }
        </div>
    );
};

export default ManageServices;