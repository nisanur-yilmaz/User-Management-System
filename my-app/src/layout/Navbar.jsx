import React from 'react';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";


function Navbar({ title = "My App" }) {

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-3">
            <div className="container ">
                <a href="/" className="navbar-brand ">{title}</a>

                <ul className="navbar-nav ">
                    <li className="nav-item active">
                        <Link to="/" className="nav-link "> Home </Link>
                    </li>
                    <li className="nav-item active">
                        <Link to="/add" className="nav-link "> Add User </Link>
                    </li>
                    <li className="nav-item active">
                        <Link to="/github" className="nav-link "> Project Files </Link>
                    </li>
                </ul>
            </div>
        </nav>


    );

}

Navbar.propTypes = {
    title: PropTypes.string.isRequired
}



export default Navbar;


/*
<di>
    <h3>{props.title}</h3>
    <ul>
        <li>
            <Link to="/">Home </Link>
        </li>
        <li>
            <Link to="/add">Add </Link>
        </li>
        <li>
            <Link to="/github">Project Files </Link>
        </li>
    </ul>
</di>
*/