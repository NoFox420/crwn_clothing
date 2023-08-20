import {
  compose,
  applyMiddleware,
  legacy_createStore as createStore,
} from "redux";

//carry state across multiple sessions
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import logger from "redux-logger";
import { rootReducer } from "./root-reducer";
import createSagaMiddleware from "redux-saga";
import { rootSaga } from "./root-saga";

const persistConfig = {
  //start from root level
  key: "root",
  //where to store into
  storage,
  //exclude this
  whitelist: ["cart"],
};

const sagaMiddleWare = createSagaMiddleware();

//created persistedReducer to use instead of rootReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

//don't run logger if environment is production
const middleWares = [
  process.env.NODE_ENV !== "production" && logger,
  sagaMiddleWare,
].filter(Boolean);

const composeEnhancer =
  (process.env.NODE_ENV !== "production" &&
    typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const composeEnhancers = composeEnhancer(applyMiddleware(...middleWares));

export const store = createStore(persistedReducer, undefined, composeEnhancers);

sagaMiddleWare.run(rootSaga);

export const persistor = persistStore(store);
