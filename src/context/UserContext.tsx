import { createContext, ReactNode, useContext } from "react"

type UserContextType = {
    id:string | null;
}
const UserContext = createContext<UserContextType>({
    id:''
});

export default function UserContextProvider({children} : {children: ReactNode}){
    const userId = localStorage.getItem('userId') ?? null;
    return <UserContext.Provider value={{id: userId}}>
        {children}
    </UserContext.Provider>
}
export function useUser(){
    return useContext(UserContext);
}