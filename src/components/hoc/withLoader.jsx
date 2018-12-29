import React from 'react';


function withLoadersWrapper(WrappedComponent, Loader) {
    class DummyLoaderClass extends React.Component {
        componentDidMount() {
            this.props.load();
        }

        render() {
            return this.props.children;
        }
    }

    class withLoadersClass extends React.Component {
        render() {
            return <Loader>
                {(load) => (
                    <DummyLoaderClass load={load}>
                        <WrappedComponent {...this.props} />
                    </DummyLoaderClass>
                )}
            </Loader>
        }
    }

    withLoadersClass.displayName = `withLoaders(${getDisplayName(WrappedComponent)})`;
    return withLoadersClass;
}

function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export function withLoader(loader) {
    return function (WrappedComponent) {
        return withLoadersWrapper(WrappedComponent, loader);
    };
}