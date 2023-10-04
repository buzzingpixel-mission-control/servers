import React, { Dispatch, SetStateAction } from 'react';
declare const RunPipelineOverlay: {
    ({ isOpen, setIsOpen, heading, message, }: {
        isOpen: boolean;
        setIsOpen: Dispatch<SetStateAction<boolean>>;
        heading?: string;
        message?: string;
    }): React.JSX.Element;
    defaultProps: {
        heading: any;
        message: any;
    };
};
export default RunPipelineOverlay;
