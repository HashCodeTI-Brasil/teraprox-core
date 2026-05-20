// @agent-touched: 2026-05-18
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
// ui-kit-core não exporta CSS — componentes são 100% Tailwind (preset aplicado
// no tailwind.config do host via @hashcodeti/ui-kit-core/tailwind-preset).
// Tailwind entry — gera utilities a partir do scan em src/ + node_modules/@hashcodeti/*
// (ver tailwind.config.js + postcss.config.js no root). Carregado APÓS bootstrap.css
// para que utilities possam sobrescrever onde necessário. Adicionado 2026-05-20
// para corrigir primitivos ui-kit-core/sgp renderizando sem estilo no host.
import './tailwind.css';
// ui-kit-sgm styles (TarefaItem.tsx — sprint 2026-04-29-tarefa-item-unified
// migrou TarefaItem.css de teraprox-SGM-OS pro package). Mesma razão acima:
// host carrega para que tela de execução / OS form em federation veja o CSS.
import '@hashcodeti/ui-kit-sgm/dist/index.css';

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
