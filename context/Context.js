import { createContext } from 'react'
import { theme } from '../utills'

const GlobalContext = createContext({
    theme,
    rooms: [],
    setRooms: () => {},
    unfilteredRooms: [],
    setUnfilteredRooms: () => {}
})

export default GlobalContext;