import React from 'react';
import { Route } from 'react-router-dom';
import SshKeyListPage from './SshKey/SshKeyListPage';

const ServersRoutes = () => (
    <>
        <Route path="/ssh-keys" element={<SshKeyListPage />} />
        <Route path="/ssh-keys/archived" element={<SshKeyListPage isArchive />} />
    </>
);

export default ServersRoutes;
