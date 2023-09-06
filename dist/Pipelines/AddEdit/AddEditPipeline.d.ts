import React from 'react';
import { UseMutationResult } from '@tanstack/react-query/src/types';
import { AddEditValues } from './AddEditValues';
declare const AddEditPipeline: {
    ({ pageName, incomingValues, mutation, onSaveSuccess, }: {
        pageName: string;
        incomingValues?: AddEditValues | undefined;
        mutation: UseMutationResult;
        onSaveSuccess: () => void;
    }): React.JSX.Element;
    defaultProps: {
        incomingValues: any;
    };
};
export default AddEditPipeline;
