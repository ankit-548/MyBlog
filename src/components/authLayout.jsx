import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../store/authSlice';

export default function Protected({
    children, 
    authenticatin= true
}) {
    const [loader, setLoader] = useState(true);
    const navigate = useNavigate();
    const authStatus = useSelector(state => state.isLoggedIn);

    useEffect(() => {
        if(authenticatin && authStatus!==authenticatin) {
            navigate('/login');
        } else if(!authenticatin && authStatus!==authenticatin) {
            navigate('/');
        }
        setLoader(false);
    }, [navigate, authStatus, authenticatin]);

    return loader ? (<div>loading...</div>) : (<div>{children}</div>) ;
}