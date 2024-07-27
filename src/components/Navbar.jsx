import React, { useEffect, useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css'; 

const Navbar = ({ count }) => {
    const { loginWithRedirect, logout, isAuthenticated, user, isLoading } = useAuth0();
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    if (isLoading) {
        return <div>Loading ...</div>;
    }

    return (
        <>
            {isAuthenticated ? (
                <nav className={`navbar navbar-expand-lg navbar-light sticky-top navbar-custom ${isScrolled ? 'scrolled' : ''}`}>
                    <div className="container">
                        <div className="d-flex justify-content-between w-100">
                            <div className="d-flex flex-column flex-lg-row align-items-center w-100">
                                <ul className="navbar-nav mx-auto text-center">
                                    <li className="nav-item">
                                        <p className="nav-link mb-0 text-center font-weight-bold text-primary" style={{ fontSize: '1.25rem' }}>
                                            Hello {user.name} <br />
                                            <span className="d-block text-secondary" style={{ fontSize: '1rem' }}>
                                                Absent Classes: {count}
                                            </span>
                                        </p>
                                    </li>
                                </ul>
                                <div className="ml-lg-auto">
                                    <button
                                        className="btn btn-outline-danger"
                                        onClick={() => logout({ returnTo: window.location.origin })}
                                    >
                                        Logout
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            ) : (
                <div className="d-flex justify-content-center align-items-center vh-100">
                    <button
                        className="btn btn-dark animated-login-btn"
                        onClick={() => loginWithRedirect()}
                    >
                        Login
                    </button>
                </div>
            )}
        </>
    );
}

export default Navbar;
