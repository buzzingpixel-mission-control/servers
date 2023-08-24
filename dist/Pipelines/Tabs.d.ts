import React, { MouseEventHandler } from 'react';
declare const Tabs: {
    ({ activeHref, addOnClick, }: {
        activeHref?: string;
        addOnClick?: MouseEventHandler<HTMLButtonElement> | undefined;
    }): React.JSX.Element;
    defaultProps: {
        activeHref: any;
        addOnClick: any;
    };
};
export default Tabs;
