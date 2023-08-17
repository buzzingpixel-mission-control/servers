import { z } from 'zod';
import { ServerWithViewOptions } from '../Servers';

export const AuthorizedKeySchema = z.object({
    key: z.string().min(1),
});

export type AuthorizedKey = z.infer<typeof AuthorizedKeySchema>;

export const AuthorizedKeysSchema = z.array(AuthorizedKeySchema);

export type AuthorizedKeys = z.infer<typeof AuthorizedKeysSchema>;

export type AuthorizedKeysWithServer = {
    keys?: AuthorizedKeys | null;
    server?: ServerWithViewOptions | null;
};
