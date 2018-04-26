import React from 'react';
import { Link } from 'react-router-dom';

export default () => (
    <nav className="navbar">
        <span className="navbar-brand">Dagbladet</span>

        <Link to="/results">Results</Link>
    </nav>
);