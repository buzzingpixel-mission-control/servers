import { z } from 'zod';
import { ServerWithViewOptions } from '../Servers';
export declare const AuthorizedKeySchema: z.ZodObject<{
    key: z.ZodString;
}, "strip", z.ZodTypeAny, {
    key?: string;
}, {
    key?: string;
}>;
export type AuthorizedKey = z.infer<typeof AuthorizedKeySchema>;
export declare const AuthorizedKeysSchema: z.ZodArray<z.ZodObject<{
    key: z.ZodString;
}, "strip", z.ZodTypeAny, {
    key?: string;
}, {
    key?: string;
}>, "many">;
export type AuthorizedKeys = z.infer<typeof AuthorizedKeysSchema>;
export type AuthorizedKeysWithServer = {
    keys?: AuthorizedKeys | null;
    server?: ServerWithViewOptions | null;
};
