import { StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import * as ReactDOM from 'react-dom/client';
import App from './app/app';
import { CssVarsProvider } from '@mui/joy/styles'
import { store, persistor } from './Redux/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <CssVarsProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>

      </CssVarsProvider>
    </PersistGate>

  </Provider>
);
