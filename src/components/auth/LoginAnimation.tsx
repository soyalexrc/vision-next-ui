'use client';
import Lottie from 'lottie-react';
import loginAnimation from '@/lib/lottie/login-animation.json';

export default function LoginAnimation() {
  return (
    <div className="w-[300px] h-[300px]">
      <Lottie animationData={loginAnimation} />
    </div>
  );
}
