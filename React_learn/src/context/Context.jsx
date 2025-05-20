import React, { createContext } from 'react'


export const Datacontext = createContext();

const Context = ({ children }) => {

    const username = "Sarthak" ;

    return (
        <Datacontext.Provider value={username}>
            {children}
        </Datacontext.Provider>
    )
}

export default Context