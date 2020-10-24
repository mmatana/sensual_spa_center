import {
  createStore,
  compose,
  applyMiddleware
} from 'redux';
import reduxThunk from 'redux-thunk';

import { rootReducer } from './reducers/index.jsx';

export const LOCAL_STORAGE_NAME = 'localData';

class PersistedStore {

    static DefaultStore = null;

    static getDefaultStore() {
      if (PersistedStore.DefaultStore === null) {
        PersistedStore.DefaultStore = new PersistedStore();
      }

      return PersistedStore.DefaultStore;
    }

    _store = null;

    constructor() {
      this.initStore();
    }

    initStore() {
      const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
      this._store = createStore(
        rootReducer,
        PersistedStore.loadState(),
        composeEnhancers(applyMiddleware(reduxThunk)));
      this._store.subscribe(() => {
        PersistedStore.saveState(this._store.getState());
      });
    }

    get store() {
      return this._store;
    }

    static loadState() {
      try {
        const serializedState = localStorage.getItem(LOCAL_STORAGE_NAME);

        if (serializedState === null) {
          return PersistedStore.initialState();
        }

        return JSON.parse(serializedState);
      } catch (err) {
        return PersistedStore.initialState();
      }
    }

    static saveState(state) {
      try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem(LOCAL_STORAGE_NAME, serializedState);
      } catch (err) {
        return '';
      }
    }

    static initialState() {
      return {};
    }
}

export default PersistedStore;
