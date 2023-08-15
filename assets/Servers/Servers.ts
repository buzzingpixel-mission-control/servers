import { z } from 'zod';
import {
    ProjectsWithViewOptions,
    ProjectWithViewOptions,
} from 'buzzingpixel-mission-control-frontend-core';
import { SshKeysWithViewOptions, SshKeyWithViewOptions } from '../SshKey/SshKeys';

export const ServerSchema = z.object({
    id: z.string().min(1),
    isActive: z.boolean(),
    projectId: z.string().nullable(),
    title: z.string().min(1),
    slug: z.string().min(1),
    sshUserName: z.string().nullable(),
    address: z.string().nullable(),
    sshPort: z.number().nullable(),
    sshKeyId: z.string().nullable(),
});

export type Server = z.infer<typeof ServerSchema>;

export const ServersSchema = z.array(ServerSchema);

export type Servers = z.infer<typeof ServersSchema>;

export type ServerWithViewOptions = Server & {
    href: string;
    manageAuthorizedKeysHref: string;
    activeOrArchivedText: string;
    project?: ProjectWithViewOptions;
    sshKey?: SshKeyWithViewOptions;
};

export type ServersWithViewOptions = Array<ServerWithViewOptions>;

export const transformServer = (
    server: Server,
    projects?: ProjectsWithViewOptions,
    sshKeys?: SshKeysWithViewOptions,
): ServerWithViewOptions => {
    projects = projects || [];

    let project: ProjectWithViewOptions | null;

    if (projects) {
        const filteredProjects = projects.filter(
            (p) => p.id === server.projectId,
        );

        if (filteredProjects[0]) {
            // eslint-disable-next-line prefer-destructuring
            project = filteredProjects[0];
        }
    }

    let sshKey: SshKeyWithViewOptions | null;

    if (sshKeys) {
        const filteredSshKeys = sshKeys.filter(
            (k) => k.id === server.sshKeyId,
        );

        if (filteredSshKeys[0]) {
            // eslint-disable-next-line prefer-destructuring
            sshKey = filteredSshKeys[0];
        }
    }

    return ({
        ...server,
        href: `/servers/${server.slug}`,
        manageAuthorizedKeysHref: `/servers/${server.slug}/authorized-keys`,
        activeOrArchivedText: server.isActive ? 'Active' : 'Archive',
        project,
        sshKey,
    });
};

export const transformServers = (
    servers: Servers,
    projects?: ProjectsWithViewOptions,
    sshKeys?: SshKeysWithViewOptions,
): ServersWithViewOptions => servers.map((server) => transformServer(
    server,
    projects,
    sshKeys,
));
