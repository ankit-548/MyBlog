import React from 'react';
import { Signup as SignupComponent } from '../components';

export default function Signup() {
    console.log('reached Signup component');
    return (
        <div className='py-8'>
            {console.log('reached Signup XML')}
            <SignupComponent/>
        </div>
    )
}