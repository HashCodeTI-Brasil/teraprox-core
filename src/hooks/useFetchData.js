import { useState } from "react";
import { useWebProvider } from "./useWebProvider";

export const useFetchData = () => {
    const { controller } = useWebProvider();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchData = async (context, url, endpoint) => {
        const dynamicController = endpoint
            ? controller(context, endpoint)
            : controller(context);
        setLoading(true);
        setError(null);
        try {
            const result = await dynamicController.get(url);
            setData(result);
            return result;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { data, loading, error, fetchData };
};
