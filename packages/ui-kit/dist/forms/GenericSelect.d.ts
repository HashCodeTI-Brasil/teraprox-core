import React from 'react';
export interface GenericSelectProps {
    noLabel?: boolean;
    title?: string;
    onChange: (value: any) => void;
    ops?: any[];
    selection?: any;
    returnType?: string;
    displayType?: string;
    filter?: string;
    filterField?: string;
    valueType?: string;
    loadFunc?: () => Promise<any>;
    loadCondition?: boolean;
    actionClick?: () => React.ReactNode;
    locked?: boolean;
    isBold?: boolean;
    default?: string;
}
export declare class GenericSelectOps {
    noLabel?: boolean;
    title?: string;
    onChange?: (value: any) => void;
    ops?: any[];
    selection?: any;
    returnType?: string;
    displayType?: string;
    filter?: string;
    filterField?: string;
    valueType?: string;
    loadFunc?: () => Promise<any>;
    loadCondition?: boolean;
    actionClick?: () => React.ReactNode;
    locked?: boolean;
    constructor(noLabel?: boolean, title?: string, onChange?: (value: any) => void, ops?: any[], selection?: any, returnType?: string, displayType?: string, filter?: string, filterField?: string, valueType?: string, loadFunc?: () => Promise<any>, loadCondition?: boolean, actionClick?: () => React.ReactNode, locked?: boolean);
}
declare const GenericSelect: React.FC<GenericSelectProps>;
export default GenericSelect;
