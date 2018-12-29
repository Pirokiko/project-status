import loadable from '@loadable/component'

export const Client = loadable(
    () => import('./Client').then(imported => imported.ClientPage)
);