import { useState } from 'react';

export interface AuthHook {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function useAuth(): AuthHook {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return { isLoggedIn, setIsLoggedIn };
}
