import React from 'react';
import { Button, Container } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import useServiceDetail from '../../hooks/useServiceDetail';

const ServiceDetail = () => {
    const { serviceId } = useParams();
    const navigate = useNavigate();
    const [service] = useServiceDetail(serviceId);

    return (
        <>
            <Container>
                <h2>Ypu Are About To Book: {service.name}</h2>
                <Button onClick={() => navigate(`/checkout/${serviceId}`)}>Check Out</Button>
            </Container>
        </>
    );
};

export default ServiceDetail;