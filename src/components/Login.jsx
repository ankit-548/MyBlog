import { useState } from "react";
import { Logo, Input, Button } from './index';
import authService from "../appwrite/auth.service";
import { login as authLogin } from '../store/authSlice';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [error, setError] = useState('');
    const{register, handleSubmit} = useForm();

    async function login(data) {
        try {
            setError('');
            const userData = await authService.login(data);
            if(userData) {
                const userData = await authService.getLoggedInUser();
                dispatch(authLogin(userData));
                navigate('/');
            }
        } catch (error) {
            console.log('Error occured',error.message);
        }
    }

    return (
        <div className="w-full grid justify-items-center m-8">
            <div className="bg-white p-4 m-8 rounded-xl hover:p-8 hover:m-4">
                <form onSubmit={handleSubmit(login)}>
                    <div>
                        <div className="flex justify-center mb-2"><Logo/></div>
                        <div>
                            <span>Don't have a account?</span>
                            <Link className="text-blue-500 m-2" to='/signup'>signup</Link>
                            <Input label='Email: ' type='email' placeholder='Enter email address' 
                            {...register("email", {
                                required: true
                            })}/>
                            <Input label="Password: " type="password"  placeholder="Enter your password" {...register("password", {
                                required: true
                            })}/>
                            <Button className="w-4/5" type="submit">Sumbit</Button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
 
export default Login;