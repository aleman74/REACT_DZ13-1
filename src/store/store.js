import {configureStore} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import dataReducer from './dataReducer';
import sagas from "../sagas/sagas";


// Конфигурируем Saga
const sagaMiddleware = createSagaMiddleware();

// Конфигурируем Store
const store = configureStore({
    reducer: {
        dataReducer           // dataReducer: dataReducer
    },
    middleware: [sagaMiddleware]
});

sagaMiddleware.run(sagas)

export default store;






