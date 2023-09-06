import React from 'react';
import { AddEditValues } from './AddEditValues';
declare const AddEditPipeline: {
    ({ pageName, incomingValues, }: {
        pageName: string;
        incomingValues?: AddEditValues | undefined;
    }): React.JSX.Element;
    defaultProps: {
        incomingValues: any;
    };
};
export default AddEditPipeline;
