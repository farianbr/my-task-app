"use client"
import { SignIn } from '@clerk/nextjs';
import React from 'react';

const page = () => {
    return (
        <div>
            This is sign in
            <SignIn></SignIn>
        </div>
    );
};

export default page;