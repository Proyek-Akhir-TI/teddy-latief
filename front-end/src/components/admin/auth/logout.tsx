'use client';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

export default function Logout() {
  const router = useRouter();

  const handleLogout = () => {
    Cookies.remove('isLoggedIn');
    router.push('/login');
  };

  return <button onClick={handleLogout}>Logout</button>;
}
