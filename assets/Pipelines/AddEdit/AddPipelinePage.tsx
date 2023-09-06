import React from 'react';
import { useHidePageTitle, usePageTitle } from 'buzzingpixel-mission-control-frontend-core';
import AddEditPipeline from './AddEditPipeline';

const Page = () => {
    const pageName = 'Add Pipeline';

    useHidePageTitle(true);

    usePageTitle(pageName);

    return <AddEditPipeline pageName={pageName} />;
};

export default Page;
