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

const persistConfig = {
  //start from root level
  key: "root",
  //where to store into
  storage,
  //exclude this
  blacklist: ["user"],
};

//created persistedReducer to use instead of rootReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

//don't run logger if environment is production
const middleWares = [process.env.NODE_ENV === "development" && logger].filter(
  Boolean
);

//use reduxDevTools extension in chrome
const composeEnhancer =
  (process.env.NODE_ENV !== "production" &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const composeEnhancers = composeEnhancer(applyMiddleware(...middleWares));

export const store = createStore(persistedReducer, undefined, composeEnhancers);

export const persistor = persistStore(store);
