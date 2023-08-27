import React, { FC, createContext, useState } from 'react'
import { UserLoginModel, UserSessionModel } from '../../network_services/networkDataModels'

interface Props {
    children?: React.ReactNode,
    setUserLoginData?: any,
    userLoginData?: UserLoginModel,
    userWholeDetails?: UserSessionModel,
    setUserWholeDetails?: any,
}
const AppContext = createContext<Props>({});
const ContextProvider: FC<Props> = ({ children }) => {
    const [userLoginData, setUserLoginData] = useState({});
    const [userWholeDetails, setUserWholeDetails] = useState({});

    return (
        <AppContext.Provider
            value={{
                userLoginData,
                setUserLoginData,
                userWholeDetails,
                setUserWholeDetails,
            }}
        >
            {children}
        </AppContext.Provider>
    )
}

export { AppContext, ContextProvider };
