import React from 'react';
import { PipelinesWithViewOptions } from './Pipelines';
declare const List: ({ isArchive, items, }: {
    isArchive: boolean;
    items: PipelinesWithViewOptions;
}) => React.JSX.Element;
export default List;
