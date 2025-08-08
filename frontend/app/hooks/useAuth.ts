import { useState } from 'react';

export interface AuthHook {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  userId:string,
  setUserId: React.Dispatch<React.SetStateAction<string>>,

}

export default function useAuth(): AuthHook {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [userId, setUserId] = useState('1212121212');

  return { isLoggedIn, setIsLoggedIn, userId, setUserId };
}
