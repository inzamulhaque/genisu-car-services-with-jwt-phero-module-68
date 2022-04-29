import React from 'react';
import "./Footer.css";

const Footer = () => {
    const date = new Date();
    return (
        <footer className='text-center mt-5'>
            <p><small>CopyRight &copy; {date.getFullYear()}</small></p>
        </footer>
    );
};

export default Footer;