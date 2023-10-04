import React, { useState } from 'react';
import {
    createPortal,
    RequestMethod,
    useApiMutation,
} from 'buzzingpixel-mission-control-frontend-core';
import { Pipeline } from './Pipelines';
import RunPipelineOverlay from './RunPipelineOverlay';

// eslint-disable-next-line import/prefer-default-export
export const useRunPipelineMutation = (pipeline: Pipeline) => {
    const [overlayIsOpen, setOverlayIsOpen] = useState(false);

    const [overlayHeading, setOverlayHeading] = useState('');

    const [overlayMessage, setOverlayMessage] = useState('');

    const runPipelineMutation = useApiMutation<{
        success: boolean;
        message: 'alreadyRunning' | '';
    }>({
        prepareApiParams: () => ({
            uri: `/pipelines/${pipeline.slug}/run`,
            method: RequestMethod.POST,
        }),
        options: {
            onSuccess: (data) => {
                setOverlayIsOpen(true);

                if (data.success) {
                    setOverlayHeading('Pipeline added to queue');

                    setOverlayMessage(
                        'The pipeline will begin running shortly!',
                    );

                    setTimeout(() => {
                        setOverlayIsOpen(false);
                    }, 4000);

                    return;
                }

                setOverlayHeading('Unable to add pipeline to queue');

                if (data.message === 'alreadyRunning') {
                    setOverlayMessage(
                        'The pipeline is already running.',
                    );

                    setTimeout(() => {
                        setOverlayIsOpen(false);
                    }, 4000);

                    return;
                }

                setOverlayMessage(
                    'An unknown error occurred.',
                );
            },
        },
    });

    const Overlay = createPortal(<RunPipelineOverlay
        isOpen={overlayIsOpen}
        setIsOpen={setOverlayIsOpen}
        heading={overlayHeading}
        message={overlayMessage}
    />);

    return {
        runPipelineMutation,
        RunPipelineOverlay: Overlay,
    };
};
