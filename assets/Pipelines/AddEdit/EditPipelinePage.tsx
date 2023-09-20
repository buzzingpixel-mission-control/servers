import React, { useState } from 'react';
import {
    PartialPageLoading,
    useBreadcrumbs,
    useHidePageTitle,
    usePageTitle,
} from 'buzzingpixel-mission-control-frontend-core';
import { useNavigate, useParams } from 'react-router-dom';
import AddEditPipeline from './AddEditPipeline';
import { useEditPipelineMutation } from '../PipelineData';
import { usePipelineDetailsData } from '../Details/PipelineDetailsData';

const Page = () => {
    const { slug } = useParams();

    const navigate = useNavigate();

    const mutation = useEditPipelineMutation(slug);

    useHidePageTitle(true);

    const [pipelineName, setPipelineName] = useState(
        'Loading Pipeline Details…',
    );

    const [pageNameState, setPageNameState] = useState(
        '…',
    );

    const [isArchive, setIsArchive] = useState(false);

    usePageTitle(pageNameState);

    useBreadcrumbs([
        {
            name: 'Pipelines',
            href: isArchive ? '/pipelines/archived' : '/pipelines',
        },
        {
            name: pipelineName,
            href: `/pipelines/${slug}`,
        },
        {
            name: pageNameState,
            href: `/pipelines/${slug}/edit`,
        },
    ]);

    const { status, data } = usePipelineDetailsData(slug);

    if (status === 'loading') {
        return <PartialPageLoading />;
    }

    const pipelineNameFromData = `Pipeline: ${data.title}`;

    if (pipelineNameFromData !== pipelineName) {
        setPipelineName(pipelineNameFromData);
    }

    const pageName = `Edit Pipeline: ${data.title}`;

    if (pageNameState !== pageName) {
        setPageNameState(pageName);
    }

    if (isArchive !== !data.isActive) {
        setIsArchive(true);
    }

    return (
        <AddEditPipeline
            pageName={pageName}
            mutation={mutation}
            incomingValues={{
                title: data.title,
                description: data.description,
                project_id: data.projectId,
                enable_webhook: data.enableWebhook,
                webhook_check_for_branch: data.webhookCheckForBranch,
                run_before_every_item: data.runBeforeEveryItem,
                pipeline_items: data.pipelineItems.map((item) => ({
                    id: item.id,
                    type: item.type,
                    description: item.description,
                    run_on_servers: item.runOnServers,
                    run_after_fail: item.runAfterFail,
                    script: item.script,
                })),
            }}
            onSaveSuccess={(jsonResponse: { slug: string }) => {
                navigate(`/pipelines/${jsonResponse.slug}`);
            }}
        />
    );
};

export default Page;
