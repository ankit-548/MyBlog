import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function Protected({
    children, 
    authenticatin= true
}) {
    const [loader, setLoader] = useState(true);
    const navigate = useNavigate();
    const authStatus = useSelector(state => state.isLoggedIn);
    console.log('reached Protected component');

    useEffect(() => {
        if(authenticatin && authStatus!==authenticatin) {
            console.log('reached protected useEffect');
            navigate('/login');
        } else if(!authenticatin && authStatus!==authenticatin) {
            console.log('reached protected useEffect else');
            navigate('/');
        }
        console.log('reached protected useEffect else');
        setLoader(false);
    }, [navigate, authStatus, authenticatin]);

    return loader ? (<div>loading...</div>) : (<div>{children}</div>) ;
}