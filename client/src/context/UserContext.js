import React, {useState, useContext} from "react";
import axios from "axios";

const UserContext = React.createContext();

export const UserProvider = ({children}) => {
    const [user, setUser] = useState(null);

    const loginUser = async ({username, password}) => {
        try {
            await axios.post("http://localhost:4000/users/login", {
                username,
                password
            })
        } catch (error) {
            console.log(error);
        }
    }

    const signUpUser = async ({username, email, password}) => {
        try {
            await axios.post("http://localhost:4000/users/login", {
                username,
                email,
                password
            })
        } catch (error) {
            console.log(error);
        }
    }

    return(
        <UserContext.Provider value={{user, loginUser, signUpUser}}>
            {children}
        </UserContext.Provider>
    )
}

export const useUserContext = () => {
    return useContext(UserContext);
}