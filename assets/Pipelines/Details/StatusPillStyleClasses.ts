import { RecentRunStatus } from './RecentRuns';

// eslint-disable-next-line import/prefer-default-export
export const StatusPillStyleClasses = {
    [RecentRunStatus.inQueue]: 'text-gray-800 bg-gray-50 ring-gray-600/20',
    [RecentRunStatus.running]: 'text-yellow-800 bg-yellow-50 ring-yellow-600/20',
    [RecentRunStatus.finished]: 'text-green-800 bg-green-50 ring-green-600/20',
    [RecentRunStatus.failed]: 'text-red-800 bg-red-50 ring-red-600/20',
    [RecentRunStatus.other]: 'text-gray-800 bg-gray-50 ring-gray-600/20',
};
