"use client"
import { SignUp } from '@clerk/nextjs';
import React from 'react';

const page = () => {
    return (
        <div>
            This is sign up
            <SignUp></SignUp>
        </div>
    );
};

export default page;