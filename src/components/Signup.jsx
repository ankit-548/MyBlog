import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../appwrite/auth.service';
import { Logo, Input, Button } from './index';
import { login as authLogin } from '../store/authSlice';

function Signup() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [error, setError] = useState();
    const { register, handleSubmit } = useForm();
    
    async function signup(data) {
        setError("");
        try {
            const userData = await authService.createAccount(data.email, data.password, data.name);
            if(userData) {
                const userData = await authService.getLoggedInUser();
                authLogin(dispatch(userData));
                navigate('/');
            }
        } catch (error) {
            console.log('Error occured', error.message);
        }
    }

    return (
        <div className='w-full'>
            <form onSubmit={handleSubmit(signup(data))}>
                <div className='p-2'><Logo/></div>
                <div>
                    <p>Don't have a account?</p>
                    <Link to='/signup'>signup</Link>
                    <Input label="Name: " type="text" placeholder="Enter your name" {...register('name', {required: true})}/>
                    <Input label='Email: ' type='email' placeholder='Enter your email' {...register('email', {required: true})}/>
                    <Input label="password" type="password" placeholder="password" {...register('password', {required: true})}/>
                    <Button type="submit">Submit</Button>
                </div>
            </form>
        </div>
    )
}

export default Signup;