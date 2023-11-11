import React, { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';

function MaybeShowNavbar ({children}) {
    const location = useLocation();
    const [showNavBar, setShowNavBar] = useState(false);
    useEffect(() => {
        console.log('This is location: ', location);
        if (location.pathname === '/' || location.pathname === '/register' || location.pathname === '/forgetPassword') {
            setShowNavBar(false);
        } else {
            setShowNavBar(true);
        }
    }, [location]);

    return (
        <div>{showNavBar && children}</div>
    )
}


export default MaybeShowNavbar