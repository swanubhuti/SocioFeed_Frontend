import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux';
import { store,persistor } from './app/store';
import ThemeProviderWrapper from './theme/ThemeProviderWrapper';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { PersistGate } from 'redux-persist/integration/react';

createRoot(document.getElementById('root')).render(
   <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProviderWrapper>
              <Toaster position="top-right" reverseOrder={false} />
         <PersistGate loading={null} persistor={persistor}>
			<App />
		</PersistGate>
        </ThemeProviderWrapper>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);