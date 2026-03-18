import axios from "axios";
import { useMemo } from "react";
import { useStore } from "react-redux";
import { logOut, setToken } from "../../Reducers/default-reducers/globalConfigReducer";
import { setGlobalError } from "../../Reducers/default-reducers/globalErrorReducer";


export const useWebInterface = ({ context, baseEndPoint, toast, wsEvent }) => {
    const store = useStore();
    const configureInterceptors = () => {
        const http = axios.create();

        http.interceptors.response.use(
            res => {
                if (res.config.method !== "get" && res.config.method !== "patch") {
                    toast?.addToast("Dados processados com sucesso", {
                        autoDismiss: true,
                        duration: 2000,
                        appearance: "success",
                    });
                }
                if (res.data?.newToken) store.dispatch(setToken(res.data?.newToken));
                processResponseMatchingObjects(res.data.matchingObjects);
                return res?.data?.content ? res.data.content : res.data;
            },
            err => {
                const status = err.response?.status;
                const data = err.response?.data;

                if (status === 400 || status === 404) {
                    if (status === 400 && Array.isArray(data.errors)) {
                        data.errors.forEach(msg =>
                            toast?.addToast(msg, { appearance: 'warning', autoDismiss: true })
                        );
                    }
                    if (status === 404) {
                        toast?.addToast('Recurso não encontrado.', { appearance: 'info', autoDismiss: true });
                    }

                }

                if (status === 401) {
                    const isStillAuth = store.getState().global.isAuth;
                    if (isStillAuth) {
                        toast?.addToast("Sessão expirada, faça login novamente.", { appearance: "warning", autoDismiss: true });
                        store.dispatch(logOut());
                    }
                    return Promise.reject({});
                }
                if (status === 403) {
                    toast?.addToast('Você não tem permissão para acessar este recurso.', { autoDismiss: true });
                }
                if (status === 500 && Array.isArray(data.errors)) {
                    data.errors.forEach(errMsg =>
                        toast?.addToast(errMsg, { autoDismiss: true, duration: 2000 })
                    );
                }

                const customError = { message: err.message, status, data, stack: err.stack };
                store.dispatch(setGlobalError(customError));
                return Promise.reject({});
            }
        );

        http.interceptors.request.use(async (config) => {
            const token = store.getState().global.token;
            if (token) {
                config.headers.Authorization = `${token}`;
            }
            return config;
        });

        return http;
    };

    const processResponseMatchingObjects = (matchingObjects) => {
        let mos = matchingObjects;
        if (!mos) return;
        if (matchingObjects && !Array.isArray(matchingObjects)) mos = [matchingObjects];
        for (let mo of mos) {
            onMessageReceive(mo);
        }
    };

    const onMessageReceive = (incomingMatchingObject) => {
        wsEvent?.dispatchEvent(
            new CustomEvent(incomingMatchingObject.context + incomingMatchingObject.location, {
                detail: incomingMatchingObject.payload,
            })
        );
    };


    const api = useMemo(() => {
        const http = configureInterceptors();
        http.defaults.baseURL = baseEndPoint;

        return {
            get: (path, query) => {
                const pathh = path || context;
                return http.get(`${pathh}${query ? "?" + query : ""}`, {
                    headers: { Contexto: context },
                });
            },
            post: (path, data, extraHeaders, query) => {
                const pathh = path || context;
                return http.post(`${pathh}${query ? "?" + query : ""}`, data, {
                    headers: { Contexto: context, ...extraHeaders },
                });
            },
            put: (path, data, extraHeaders, query) => {
                const pathh = path || context;
                return http.put(`${pathh}${query ? "?" + query : ""}`, data, {
                    headers: { Contexto: context, ...extraHeaders },
                });
            },
            patch: (path, data, extraHeaders, query) => {
                const pathh = path || context;
                return http.patch(`${pathh}${query ? "?" + query : ""}`, data, {
                    headers: { Contexto: context, ...extraHeaders },
                });
            },
            deleteSimple: (path, extraHeaders, query) => {
                const pathh = path || context;
                return http.delete(`${pathh}${query ? "?" + query : ""}`, {
                    headers: { Contexto: context, ...extraHeaders },
                });
            },
            save: (path, data, extraHeaders, query) => {
                const pathh = path || context;
                if (data.id || data._id) {
                    return http.put(
                        `${pathh}/${data.id || data._id}${query ? "?" + query : ""}`,
                        data,
                        { headers: { Contexto: context, ...extraHeaders } }
                    );
                } else {
                    return http.post(
                        `${pathh}${query ? "?" + query : ""}`,
                        data,
                        { headers: { Contexto: context, ...extraHeaders } }
                    );
                }
            },
            read: (path, id, extraHeaders, query) => {
                const pathh = path || context;
                return http.get(`${pathh}/${id}${query ? "?" + query : ""}`, {
                    headers: { Contexto: context, ...extraHeaders },
                });
            },
            readAll: (path, extraHeaders, query) => {
                const pathh = path || context;
                return http.get(`${pathh}/all${query ? "?" + query : ""}`, {
                    headers: { Contexto: context, ...extraHeaders },
                });
            },
            readAllwithPage: (path, page, size, extraHeaders) => {
                const pathh = path || context;
                return http.get(`${pathh}?page=${page}&size=${size}`, {
                    headers: { Contexto: context, ...extraHeaders },
                });
            },
            delete: (path, id, extraHeaders, query) => {
                const pathh = path || context;
                return http.delete(`${pathh}/${id}${query ? "?" + query : ""}`, {
                    headers: { Contexto: context, ...extraHeaders },
                });
            },
            bulkDelete: (path, ids, extraHeaders = {}, query = "") => {
                const pathh = path || context;
                const bulkParam = `ids=${ids.join(",")}`;
                const fullQuery = query ? `${query}&${bulkParam}` : bulkParam;
                const url = `${pathh}?${fullQuery}`;
                return http.delete(url, {
                    headers: { Contexto: context, ...extraHeaders },
                });
            },
        };
    }, [context, baseEndPoint]);




    return api;
};
