import React from 'react';
export declare class ConfigObject {
    dotNotation: string;
    style?: React.CSSProperties;
    onClick?: () => void;
    onBlur?: () => void;
    onHideClick?: () => void;
    hidden?: boolean;
    mapData?: any;
    additionalComponents?: (() => React.ReactNode)[];
    constructor(dotNotation: string, style?: React.CSSProperties, onClick?: () => void, onBlur?: () => void, onHideClick?: () => void, hidden?: boolean, mapData?: any, additionalComponents?: (() => React.ReactNode)[]);
}
interface GenericDisplayProps {
    ops?: any[];
    loadFunc?: () => Promise<any>;
    configObjects?: ConfigObject[];
    rootName?: string;
    context?: string;
    /** Optional hook to call on mount/context update. Replaces the app-specific useContextUpdateHandler. */
    onRefresh?: (refreshFunc: () => void) => void;
    /** Optional renderer for edit buttons on root objects. */
    editButtonRenderer?: (obj: any, location: string | null) => React.ReactNode;
}
declare const GenericDisplay: React.FC<GenericDisplayProps>;
export default GenericDisplay;
