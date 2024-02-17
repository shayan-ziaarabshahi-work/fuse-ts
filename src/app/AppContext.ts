import { AppContextOptions } from '@types-fuse/appContext';
import { createContext } from 'react';

const AppContext = createContext<AppContextOptions>({});

export default AppContext;
