import { ServerWithViewOptions } from '../Servers';
export declare const useServerDetailsData: (slug: string) => {
    status: 'loading' | 'error' | 'success';
    data?: ServerWithViewOptions;
};
