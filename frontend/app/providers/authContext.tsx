
import useAuth from 'app/hooks/useAuth';
import { createContext, useContext, type Dispatch, type SetStateAction } from 'react';

interface AuthContextType  {
  isLoggedIn: boolean,
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
}


const initAuthContext = {
  isLoggedIn: false,
  setIsLoggedIn: () => { },
}

const AuthContext = createContext<AuthContextType>(initAuthContext);

// const useAuthContext = useContext(AuthContext);


export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {

const  {isLoggedIn, setIsLoggedIn} = useAuth();


  const num = 3;

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }} >
      {children}
    </AuthContext.Provider>
  )
};



// export { useAuthContext };
