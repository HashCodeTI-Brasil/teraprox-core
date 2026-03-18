import { useEffect } from 'react';
import { useStore } from 'react-redux';

/**
 * Custom hook to inject a reducer into the Redux store dynamically.
 * 
 * @param {string} key - The key under which the reducer will be injected in the state.
 * @param {Function} reducer - The reducer function to be injected.
 */
const useInjectReducer = (key, reducer) => {
    const store = useStore();

    useEffect(() => {
        if (store.injectReducer && key && reducer) {
            // Only inject if it's not already there to avoid unnecessary re-renders/replacements
            if (!store.asyncReducers[key]) {
                store.injectReducer(key, reducer);
            }
        }
    }, [key, reducer, store]);
};

export default useInjectReducer;
