import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setPageLocation, setPrevPage } from '../../Reducers/default-reducers/globalConfigReducer';
import { paths } from '../../models/constantes';

const useNavigator = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const global = useSelector((state) => state.global);

	return  (path, config, pageName) => {
		
		let allowedPaths = [paths.loginForm, paths.loginForm]
		if (allowedPaths.includes(path)) return navigate(path);
		if (!path) path = -1;

		if (path == -1) {
			dispatch(setPrevPage(global.pageLocation));
			dispatch(setPageLocation(global.prevPage));
			return navigate(-1);
		} else {
			if (global.role?.permissao?.[0]?.frontEndPerms?.length > 0) {
				const currentUserFrontEndPerms = global.role.permissao[0].frontEndPerms;
				for (let frontEndPerms of currentUserFrontEndPerms) {
					const locationBloqueado = `/${frontEndPerms.locationBloqueado}`

					if (locationBloqueado != '*') {

						if (locationBloqueado != path) {
							dispatch(setPrevPage(global.pageLocation));
							dispatch(setPageLocation(pageName));
							return navigate(path, { ...config, replace: false });
						} else {
							return navigate(paths.acessoNaoPermitido);
						}

					} else {
						dispatch(setPrevPage(global.pageLocation));
						return navigate('/inativeUser');
					}
				}
			} else {
				dispatch(setPrevPage(global.pageLocation));
				dispatch(setPageLocation(pageName));
				return navigate(path, { ...config, replace: false });
			}
		}

	};
};

export default useNavigator;
