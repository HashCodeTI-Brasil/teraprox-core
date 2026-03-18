import { useContext } from 'react';
import { WebProvider } from '../websocket/wsProvider';

export const useWebProvider = () => {
    const webProvider = useContext(WebProvider);
    return {
        ...webProvider,
        controller: webProvider?.basicController
    };
};
