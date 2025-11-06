'use client';

import { useRouter } from 'next/navigation';
import { LandingPage } from '../views/LandingPage';

export default function Landing() {
  const router = useRouter();

  return <LandingPage onClose={() => router.push('/')} />;
}

