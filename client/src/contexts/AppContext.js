import {createContext} from 'react';

const AppContext = createContext({
    auth: null,
    setAuth: () => {},
    logout: () => {}
});

export default AppContext;