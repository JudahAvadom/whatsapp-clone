import React, { useState } from 'react';
import Context from './Context';
import { theme } from '../utills'

export default function ContextWrapper(prop){
    const [rooms, setRooms] = useState([]);
    const [unfilteredRooms, setUnfilteredRooms] = useState([]);
    return (
        <Context.Provider value={{ theme, rooms, setRooms, unfilteredRooms, setUnfilteredRooms }}>
            {prop.children}
        </Context.Provider>
    )
}