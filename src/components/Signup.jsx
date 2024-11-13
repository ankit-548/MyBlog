import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../appwrite/auth.service';
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
            if(data) {
                const userData = await authService.createAccount(data);
                if(userData) {
                    const userData = await authService.getLoggedInUser();
                    dispatch(authLogin(userData));
                    navigate('/');
                }
            }
        } catch (error) {
            console.log('Error occured', error.message);
        }
    }

    return (
        <div className='grid justify-items-center m-8'>
            <div className='bg-white p-4 m-8 rounded-lg hover:p-8 hover:m-4'>
                <form onSubmit={handleSubmit(signup)}>
                    <div className='flex justify-center m-2 p-2'><Logo/></div>
                    <div>
                        <span>Don't have a account?</span>
                        <Link  className='ml-2 text-blue-600' to='/login'>login</Link>
                        <Input label="Name: " type="text" placeholder="Enter your name" {...register('name', {required: true})}/>
                        <Input label='Email: ' type='email' placeholder='Enter your email' {...register('email', {required: true})}/>
                        <Input label="password" type="password" placeholder="password" {...register('password', {required: true})}/>
                        <Button className="w-4/5" type="submit">Submit</Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signup;