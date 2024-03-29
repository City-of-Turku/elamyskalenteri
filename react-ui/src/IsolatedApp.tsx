import React, { Component } from 'react';
import { Provider } from 'react-redux';
import App from './App';
import { store as reduxStore } from './redux/store';
import { appDataAttributes } from './types';

type IsolatedAppProps = {
  data: appDataAttributes;
};

class IsolatedApp extends Component<IsolatedAppProps> {
  store: ReturnType<typeof reduxStore>;

  constructor(props: IsolatedAppProps) {
    super(props);
    // Create a local instance of a redux store so that
    // each component instance will have its own store.
    // https://redux.js.org/usage/isolating-redux-sub-apps
    this.store = reduxStore();
  }

  render() {
    return (
      <Provider store={this.store}>
        <App data={this.props.data} />
      </Provider>
    );
  }
}

export default IsolatedApp;
