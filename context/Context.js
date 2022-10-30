import { createContext } from 'react'
import { theme } from '../utills'

const GlobalContext = createContext({
    theme,
})

export default GlobalContext;