interface BranchNode {
    recurso: {
        id: any;
        nome: string;
        branch: {
            id: any;
            branchLevel: {
                level: number;
            };
        };
    };
}
interface Branch {
    id?: any;
    branchLevel: {
        color: string;
        nome: string;
        level: number;
    };
    branchNodes: BranchNode[];
    nomeRecurso?: string;
}
interface BranchDropDisplayProps {
    branch: Branch;
    addBranch: (bn: BranchNode) => void;
    multiMode: boolean;
    setMultiMode: (v: boolean) => void;
    onSaveRecurso: (recursos: any[]) => void;
    backOnBranch: (branch: Branch) => void;
    branches: Branch[];
    singleReturn?: boolean;
}
declare const BranchDropDisplay: ({ branch, addBranch, multiMode, setMultiMode, onSaveRecurso, backOnBranch, branches, singleReturn, }: BranchDropDisplayProps) => import("react/jsx-runtime").JSX.Element;
export default BranchDropDisplay;
