/**
 * SharedHooks — Barrel module exposto via Module Federation.
 *
 * Este módulo é o ponto centralizado de hooks compartilhados que o core
 * disponibiliza para os apps federados (SGP, SGM). Os remotes importam
 * deste módulo via `teraprox_core/SharedHooks` para garantir uma única
 * fonte de verdade e evitar divergência de implementação.
 */
export { default as useNavigator } from './defaults/useNavigator';
export { useWebProvider } from './useWebProvider';
export { useBasicService } from './useBasicService';
export { useFetchData } from './useFetchData';
export { usePostData } from './usePostData';

