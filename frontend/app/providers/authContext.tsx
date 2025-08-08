
import useAuth from 'app/hooks/useAuth';
import { createContext, useContext, type Dispatch, type SetStateAction } from 'react';

interface AuthContextType  {
  isLoggedIn: boolean,
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
  userId:string, setUserId:Dispatch<SetStateAction<string>>;
}


const initAuthContext = {
  isLoggedIn: false,
  setIsLoggedIn: () => { },
  userId: "",
  setUserId: () => { }
}

const AuthContext = createContext<AuthContextType>(initAuthContext);

// const useAuthContext = useContext(AuthContext);


export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {

const  {isLoggedIn, setIsLoggedIn, userId, setUserId} = useAuth();


  const num = 3;

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn,userId, setUserId }} >
      {children}
    </AuthContext.Provider>
  )
};



