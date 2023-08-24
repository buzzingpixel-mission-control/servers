import React from 'react';
import { Route } from 'react-router-dom';
import SshKeyListPage from './SshKey/SshKeyListPage';
import SshKeyDetailsPage from './SshKey/Details/SshKeyDetailsPage';
import { default as ServersPage } from './Servers/Page';
import { default as ServerDetailsPage } from './Servers/Details/Page';
import { default as AuthorizedKeysPage } from './Servers/AuthorizedKeys/Page';
import { default as PipelinesPage } from './Pipelines/Page';

const ServersRoutes = () => (
    <>
        <Route path="/ssh-keys" element={<SshKeyListPage />} />
        <Route path="/ssh-keys/archived" element={<SshKeyListPage isArchive />} />
        <Route path="/ssh-keys/:slug" element={<SshKeyDetailsPage />} />
        <Route path="/servers" element={<ServersPage />} />
        <Route path="/servers/archived" element={<ServersPage isArchive />} />
        <Route path="/servers/:slug" element={<ServerDetailsPage />} />
        <Route path="/servers/:slug/authorized-keys" element={<AuthorizedKeysPage />} />
        <Route path="/pipelines" element={<PipelinesPage />} />
        <Route path="/pipelines/archived" element={<PipelinesPage isArchive />} />
    </>
);

export default ServersRoutes;
