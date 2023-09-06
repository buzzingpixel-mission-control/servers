export type PipelineItem = {
    id: string;
    type: 'source' | 'code';
    description: string;
    run_on_servers: Array<string>;
    script: string;
};
export type AddEditValues = {
    title: string;
    description: string;
    project_id: string;
    enable_webhook: boolean;
    webhook_check_for_branch: string;
    run_before_every_item: string;
    pipeline_items: Array<PipelineItem>;
};
