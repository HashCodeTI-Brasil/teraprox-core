import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ToastProvider } from 'react-toast-notifications';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { BrowserRouter } from 'react-router-dom';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';

import App from './App';
import { store, persistor } from './store';

// 🌐 Configure dayjs to use Portuguese (Brazil) locale
dayjs.locale('pt-br');
import { ValidateProvider } from './providers/ValidateProvider';
import CoreServiceProvider from './providers/CoreServiceProvider';
import WebProviderComponent from './websocket/wsProvider';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'teraprox-ui-kit/index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <ToastProvider>
                <StrictMode>
                    <ValidateProvider>
                        <DndProvider backend={HTML5Backend}>
                            <BrowserRouter>
                                <WebProviderComponent>
                                    <CoreServiceProvider>
                                        <App />
                                    </CoreServiceProvider>
                                </WebProviderComponent>
                            </BrowserRouter>
                        </DndProvider>
                    </ValidateProvider>
                </StrictMode>
            </ToastProvider>
        </PersistGate>
    </Provider>
);
