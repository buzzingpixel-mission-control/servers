import { RecentRunStatus, RecentRunWithViewOptions } from '../RecentRuns';

// eslint-disable-next-line import/prefer-default-export
export const useDeployRunData = (pipelineId: string, jobId: string): {
    status: 'loading' | 'error' | 'success';
    data?: RecentRunWithViewOptions;
} => {
    // const uri = `/pipelines/${pipelineId}/run/${jobId}`;
    console.log('todo: fetch real data');

    return {
        status: 'success',
        data: {
            id: '0027d888-df96-446b-921e-e95cfe96b698',
            pipelineId: '58506732-3ba2-4212-b3e2-256855b2500a',
            hasStarted: true,
            isFinished: true,
            hasFailed: false,
            percentComplete: 100,
            addedAt: '2023-10-19 23:47:50',
            finishedAt: '2023-10-19 23:51:25',
            status: RecentRunStatus.inQueue,
            addedAtDate: new Date('2023-10-19 23:47:50'),
            finishedAtDate: new Date('2023-10-19 23:51:25'),
            items: [
                {
                    id: 'a243df77-cb1f-4226-80f0-4828ecdb971b',
                    pipelineId: '58506732-3ba2-4212-b3e2-256855b2500a',
                    pipelineJobId: '0027d888-df96-446b-921e-e95cfe96b698',
                    pipelineItemId: 'ee558072-4dde-44c6-9fab-c64af678c3d4',
                    itemOrder: 1,
                    hasFailed: false,
                    logContent: 'Running on Local Shell\n'
                        + 'Script:\n'
                        + '```\n'
                        + 'foo=bar;\n'
                        + '\n'
                        // eslint-disable-next-line no-template-curly-in-string
                        + 'echo ${foo};\n'
                        + '```\n'
                        + 'bar',
                    finishedAt: '2023-10-19 23:51:22',
                    finishedAtDate: new Date('2023-10-19 23:51:22'),
                    isFinished: true,
                    status: RecentRunStatus.finished,
                },
                {
                    id: '8c50c316-2b70-4200-9ebd-b44cfbffcd50',
                    pipelineId: '58506732-3ba2-4212-b3e2-256855b2500a',
                    pipelineJobId: '0027d888-df96-446b-921e-e95cfe96b698',
                    pipelineItemId: '20f43ca2-94c6-4eea-a573-9e4e9501384c',
                    itemOrder: 2,
                    hasFailed: false,
                    logContent: 'Yaml item  Yaml Item 1 has not been assigned to any servers\n'
                        + 'Running on buzzingpixel-do-ee-docker-demo\n'
                        + 'Script:\n'
                        + '```\n'
                        + 'DATE_STAMP=20231019234750;\n'
                        + '\n'
                        + 'tmp=YamlItem2;\n'
                        // eslint-disable-next-line no-template-curly-in-string
                        + 'echo ${DATE_STAMP};\n'
                        // eslint-disable-next-line no-template-curly-in-string
                        + 'echo ${tmp};\n'
                        + '```\n'
                        + '20231019234750\n'
                        + 'YamlItem2\n'
                        + '\n'
                        + 'Running on Local Shell\n'
                        + 'Script:\n'
                        + '```\n'
                        + 'DATE_STAMP=20231019234750;\n'
                        + '\n'
                        + 'tmp=YamlItem2;\n'
                        // eslint-disable-next-line no-template-curly-in-string
                        + 'echo ${DATE_STAMP};\n'
                        // eslint-disable-next-line no-template-curly-in-string
                        + 'echo ${tmp};\n'
                        + '```\n'
                        + '20231019234750\n'
                        + 'YamlItem2',
                    finishedAt: '2023-10-19 23:51:25',
                    finishedAtDate: new Date('2023-10-19 23:51:25'),
                    isFinished: true,
                    status: RecentRunStatus.finished,
                },
            ],
        },
    };
};
