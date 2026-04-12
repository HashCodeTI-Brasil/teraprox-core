import type { HttpController } from 'teraprox-core-sdk';
import '../styles/RecursoDisplayer.css';
export interface RecursoDisplayerProps {
    selectedList?: any[];
    onSaveRecurso: (recursos: any[], checked?: boolean) => void;
    singleReturn?: boolean;
    arvoreEstruturalController?: HttpController;
    branchLevelController?: HttpController;
    recursoController?: HttpController;
}
export declare const RecursoDisplayer: ({ selectedList, onSaveRecurso, singleReturn, arvoreEstruturalController: injectedArvore, branchLevelController: injectedBranchLevel, recursoController: injectedRecurso, }: RecursoDisplayerProps) => import("react/jsx-runtime").JSX.Element;
export default RecursoDisplayer;
