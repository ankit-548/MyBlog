import { useState } from "react";
import { Logo, Input, Button } from './index';
import authService from "../appwrite/auth.service";
import { login as authLogin } from '../store/authSlice';
import { Link, useNavigate } from "react-router-dom";
import { useDiapatch } from "react-redux";
import { useForm } from "react-hook-form";

function Login() {
    const navigate = useNavigate();
    const dispatch = useDiapatch();
    const [error, setError] = useState('');
    const{register, handleSubmit} = useForm();

    async function login(data) {
        try {
            setError('');
            const userData = await authService.login(data.email, data.password);
            if(userData) {
                const userData = await authService.getLoggedInUser();
                authLogin(dispatch(userData));
                navigate('/');
            }
        } catch (error) {
            console.log('Error occured',error.message);
        }
    }

    return (
        <div className="w-full rounded-xl">
            <form onSubmit={handleSubmit(login())}>
                <div>
                    <div className="p-2"><Logo/></div>
                    <div>
                        <p>Don't have a account?</p>
                        <Link to='/signup'>signup</Link>
                        <Input label='Email: ' type='email' placeholder='Enter email address' 
                        {...register("email", {
                            required: true
                        })}/>
                        <Input label="Password: " type="password"  placeholder="Enter your password" {...register("password", {
                            required: true
                        })}/>
                        <Button type="submit">Sumbit</Button>
                    </div>
                </div>
            </form>
        </div>
    )
}
 
export default Login;