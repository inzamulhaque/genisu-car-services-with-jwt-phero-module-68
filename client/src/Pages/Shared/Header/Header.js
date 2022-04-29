import React from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import logo from '../../../images/logo.png';
import auth from '../../../firebase.init';
import { signOut } from 'firebase/auth';

import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import "./Header.css";
import { useAuthState } from 'react-firebase-hooks/auth';

const Header = () => {
    const [user] = useAuthState(auth);
    return (
        <>
            <Navbar collapseOnSelect sticky="top" expand="lg" bg="primary" variant="dark">
                <Container>
                    <Navbar.Brand as={Link} to="/">
                        <img src={logo} height={30} alt="Logo" />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="#services">Services</Nav.Link>
                            <Nav.Link href="#experts">Experts</Nav.Link>
                            <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        <Nav>
                            <Nav.Link as={Link} to="/about">About</Nav.Link>
                            {
                                user ?
                                    <>
                                        <Nav.Link as={Link} to="/addservice">Add</Nav.Link>
                                        <Nav.Link as={Link} to="/manage">Manage</Nav.Link>
                                        <Nav.Link as={Link} to="/orders">Orders</Nav.Link>

                                        <Button onClick={() => signOut(auth)} variant="danger">Sign Out</Button>
                                    </>
                                    : <Nav.Link as={Link} to="/signin">
                                        Sign In
                                    </Nav.Link>
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
};

export default Header;