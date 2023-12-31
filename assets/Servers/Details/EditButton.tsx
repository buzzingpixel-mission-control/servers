import React, { useState } from 'react';
import { createPortal } from 'buzzingpixel-mission-control-frontend-core';
import EditOverlay from './EditOverlay';
import { Server } from '../Servers';

const EditButton = (
    {
        item,
    }: {
        item: Server;
    },
) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {(() => {
                if (!isOpen) {
                    return null;
                }

                return createPortal(
                    <EditOverlay item={item} setIsOpen={setIsOpen} />,
                );
            })()}
            <button
                type="button"
                className="inline-flex items-center justify-center rounded-md bg-cyan-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
                onClick={() => {
                    setIsOpen(true);
                }}
            >
                Edit
            </button>
        </>
    );
};

export default EditButton;
