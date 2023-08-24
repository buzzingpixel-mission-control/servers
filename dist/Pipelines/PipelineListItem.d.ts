import React from 'react';
import { PipelineWithViewOptions } from './Pipelines';
declare const ListItem: {
    ({ isArchive, item, projectPageSlug, selectedItemsManager, }: {
        isArchive: boolean;
        item: PipelineWithViewOptions;
        projectPageSlug?: string | null | undefined;
        selectedItemsManager?: {
            selectedItems?: Array<string> | null | undefined;
            addSelectedItem?: (id: string) => void;
            removeSelectedItem?: (id: string) => void;
        };
    }): React.JSX.Element;
    defaultProps: {
        projectPageSlug: any;
        selectedItemsManager: any;
    };
};
export default ListItem;
