import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ConfigProvider } from 'antd'
import { BrowserRouter } from 'react-router-dom';

import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
import { Provider} from 'react-redux'
import { store } from './store.js'


const persistor = persistStore(store);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PersistGate persistor={persistor}>
      <Provider store={store}>
        <ConfigProvider theme={{
          token: {
            colorPrimary: '#05dad3',
            colorLink: '#05dad3',
            colorLinkHover: '#d457a1',
            colorLinkActive: '#b0026a'
          },
        }}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ConfigProvider>
      </Provider>
    </PersistGate>
  </React.StrictMode>,
)
