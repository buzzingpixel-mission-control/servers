import React from 'react';
import Select from 'react-select';
import { PipelineItem as PipeLineItemValues } from './AddEditValues';
import { useAllServerData } from '../../Servers/ServerData';
import SpecialCases from '../SpecialCases';

type Option = {
    value: string;
    label: string;
};

type Options = Array<Option>;

const Input = (
    {
        item,
        setPipelineItemInnerItem,
    }: {
        item: PipeLineItemValues;
        setPipelineItemInnerItem: (
            id: string,
            key: 'description' | 'script' | 'run_on_servers' | 'run_after_fail',
            value: string | boolean | Array<string>,
        ) => void;
    },
) => {
    const { status, data } = useAllServerData();

    if (status === 'loading') {
        return (
            <div
                className="inline-block align-middle h-3 w-3 animate-spin rounded-full border-2 border-solid border-current border-r-transparent text-info motion-reduce:animate-[spin_1.5s_linear_infinite] opacity-100 text-cyan-600"
                role="status"
            >
                <span
                    className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                >
                    Loading...
                </span>
            </div>
        );
    }

    const options = [{
        value: SpecialCases.localShell,
        label: 'Local Shell',
    }] as Options;

    data.forEach((project) => {
        options.push({
            value: project.id,
            label: project.title,
        });
    });

    const value = options.filter(
        (option) => item.run_on_servers.indexOf(option.value) > -1,
    );

    return (
        <Select
            onChange={(selected) => {
                setPipelineItemInnerItem(
                    item.id,
                    'run_on_servers',
                    selected.map((option) => option.value),
                );
            }}
            value={value}
            options={options}
            className="react-select-control"
            isClearable
            isMulti
        />
    );
};

const PipelineItemRunOnServers = (
    {
        item,
        setPipelineItemInnerItem,
    }: {
        item: PipeLineItemValues;
        setPipelineItemInnerItem: (
            id: string,
            key: 'description' | 'script',
            value: string,
        ) => void;
    },
) => (
    <div>
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control,jsx-a11y/label-has-for */}
        <label
            className="text-sm font-medium text-gray-900"
        >
            Run On Servers
        </label>
        <div>
            <Input
                item={item}
                setPipelineItemInnerItem={setPipelineItemInnerItem}
            />
        </div>
    </div>
);
export default PipelineItemRunOnServers;
