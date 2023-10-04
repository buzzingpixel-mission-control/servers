import React, {
    Dispatch,
    Fragment,
    SetStateAction,
} from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { RectangleGroupIcon } from '@heroicons/react/24/outline';

const RunPipelineOverlay = (
    {
        isOpen,
        setIsOpen,
        heading,
        message,
    }: {
        isOpen: boolean;
        setIsOpen: Dispatch<SetStateAction<boolean>>;
        heading?: string;
        message?: string;
    },
) => (
    <Transition.Root show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={setIsOpen}>
            <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <div className="fixed inset-0 z-50 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                        <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                            <div className="sm:flex sm:items-start">
                                <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-cyan-100 sm:mx-0 sm:h-10 sm:w-10">
                                    <RectangleGroupIcon className="h-6 w-6 text-cyan-600" aria-hidden="true" />
                                </div>
                                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                    {(() => {
                                        if (heading) {
                                            return (
                                                <>
                                                    <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                                                        {heading}
                                                    </Dialog.Title>
                                                    <div className="mt-2">
                                                        <p className="text-sm text-gray-500">
                                                            {message}
                                                        </p>
                                                    </div>
                                                </>
                                            );
                                        }

                                        return (
                                            <p className="text-sm text-gray-500">
                                                {message}
                                            </p>
                                        );
                                    })()}
                                </div>
                            </div>
                            <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                                <button
                                    type="button"
                                    className="inline-flex w-full justify-center rounded-md bg-cyan-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-cyan-500 sm:ml-3 sm:w-auto"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Got It
                                </button>
                            </div>
                        </Dialog.Panel>
                    </Transition.Child>
                </div>
            </div>
        </Dialog>
    </Transition.Root>
);

RunPipelineOverlay.defaultProps = {
    heading: undefined,
    message: undefined,
};

export default RunPipelineOverlay;
