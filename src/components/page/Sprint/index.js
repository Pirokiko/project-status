import loadable from '@loadable/component'

export const Sprint = loadable(
    () => import('./Sprint').then(imported => imported.Sprint)
);