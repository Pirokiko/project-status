import loadable from '@loadable/component'

export const Project = loadable(
    () => import('./Project').then(imported => imported.ProjectPage)
);