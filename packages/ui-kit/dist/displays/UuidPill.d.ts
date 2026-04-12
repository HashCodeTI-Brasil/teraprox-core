import React from 'react';
interface UuidPillProps {
    uuid: string | null | undefined;
    bg?: string;
    textColor?: string;
    short?: number;
}
declare const UuidPill: React.FC<UuidPillProps>;
export default UuidPill;
