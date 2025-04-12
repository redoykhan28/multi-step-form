'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

const Page = () => {
  const router = useRouter();
  return (
    <main style={{ padding: '2rem' }}>
      <h1 className='text-4xl text-center pb-8 uppercase'>Welcome to the Multi-Step Form</h1>
      <button onClick={() => router.push('/step1')}>Start Now</button>
    </main>
  );
};

export default Page;
