import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { PersistConfig, persistStore, persistReducer } from "redux-persist";
import storage from "./localforage";
import AuthReducer from "@/redux/slices/AuthSlice";
import AuthApi from "./services/AuthService";

// Combine reducers
const rootReducer = combineReducers({
  auth: AuthReducer,
  [AuthApi.reducerPath]: AuthApi.reducer,
});

// Infer type BEFORE using it in persist config
type RootReducerType = ReturnType<typeof rootReducer>;

const persistConfig: PersistConfig<RootReducerType> = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["auth"],
};

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store with persisted reducer and middleware
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      AuthApi.middleware
    ),
});

// Create persistor
const persistor = persistStore(store);

// Types
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

// Export
export { store, persistor };
