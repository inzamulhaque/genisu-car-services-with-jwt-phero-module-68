import React from 'react';

const Expert = ({ expert }) => {
    const { name, img } = expert;
    return (
        <div className='col-12 col-md-6 col-lg-4'>
            <div className="card">
                <img src={img} className="card-img-top" alt="Expert Image" />
                <div className="card-body">
                    <h5 className="card-title">{name}</h5>
                </div>
            </div>
        </div>
    );
};

export default Expert;