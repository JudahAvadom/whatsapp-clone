import React from 'react';
import Context from './Context';
import { theme } from '../utills'

export default function ContextWrapper(prop){
    return (
        <Context.Provider value={{theme}}>
            {prop.children}
        </Context.Provider>
    )
}