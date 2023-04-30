import { NavLink,Outlet } from "react-router-dom";
import React from 'react';

const RootLayout = props => {
    
    return (
        <div calass="root-layout"> 
            <header>
                <nav>
                    <h1>ProMedicus</h1>
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="admissions" refresh ="true">Admissions</NavLink>
                </nav>
            </header>
            <main>
                <Outlet></Outlet>
            </main>
        </div>
    );
};



export default RootLayout;