import loadable from '@loadable/component';

export const Home = loadable(
    () =>  import('./Home').then(imported => imported.HomePage)
)