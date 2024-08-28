import React, { createContext, useState } from 'react'

export const projectAddResponse = createContext('')
export const projectEditResponse = createContext('')

function ContextShare({ children }) {

    const [addResponse, setAddResponse] = useState('')
    const [editResponse, setEditResponse] = useState('')

    return (
        <>
            <projectAddResponse.Provider value={{ addResponse, setAddResponse }}>
                <projectEditResponse.Provider value={{ editResponse, setEditResponse }}>
                    {children}
                </projectEditResponse.Provider>
            </projectAddResponse.Provider>
        </>
    )
}

export default ContextShare