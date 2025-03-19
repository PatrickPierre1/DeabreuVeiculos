"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const TokenChecker = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('deabreu.token');
    if (!token) {
      router.push('/login');
    }
  }, [router]);

  return null;
};

export default TokenChecker;