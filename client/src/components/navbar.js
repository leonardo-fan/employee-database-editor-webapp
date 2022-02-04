// links to change the component viewed on the app
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "../../node_modules/bootstrap/js/src/collapse.js";

export default function Navbar () {
    const [isNavCollapsed, setIsNavCollapsed] = useState(true);

    const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);
    
    return (
        <div className="sticky-top">
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <NavLink className="navbar-brand mx-3 my-1 h1" to="/">🏢 Employees</NavLink>
                <button
                    className="navbar-toggler mx-3"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded={!isNavCollapsed ? true : false}
                    aria-label="Toggle navigation"
                    onClick={handleNavCollapse}
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse`} id="navbarSupportedContent">
                    <ul className="navbar-nav position-absolute end-0 mx-3">
                            <li className="nav-item">
                                <button className="btn btn-success">
                                    <NavLink className="nav-link text-light" to="/create">➕ Create New Record</NavLink>
                                </button>
                            </li>
                    </ul>
                </div>
            </nav>
        </div>
    );
}