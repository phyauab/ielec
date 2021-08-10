import React, {useState, useContext} from "react";
import axios from "axios";

const UserContext = React.createContext();

export const UserProvider = ({children}) => {
    const [user, setUser] = useState(null);

    const loginUser = (e) => {
        e.preventDefault();
        console.log("wtf")
    }

    return(
        <UserContext.Provider value={{user, loginUser}}>
            {children}
        </UserContext.Provider>
    )
}

export const useUserContext = () => {
    return useContext(UserContext);
}