import React from 'react';
import {
    useBreadcrumbs,
    useHidePageTitle,
    usePageTitle,
} from 'buzzingpixel-mission-control-frontend-core';
import { useNavigate } from 'react-router-dom';
import AddEditPipeline from './AddEditPipeline';
import { useAddPipelineMutation } from '../PipelineData';

const Page = () => {
    const pageName = 'Add Pipeline';

    const navigate = useNavigate();

    useHidePageTitle(true);

    usePageTitle(pageName);

    useBreadcrumbs([
        {
            name: 'Pipelines',
            href: '/pipelines',
        },
        {
            name: pageName,
            href: '/pipelines/add',
        },
    ]);

    return (
        <AddEditPipeline
            pageName={pageName}
            mutation={useAddPipelineMutation()}
            onSaveSuccess={() => { navigate('/pipelines'); }}
        />
    );
};

export default Page;
