import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { Provider } from 'react-redux';
import { store } from './app/store';
import ThemeProviderWrapper from './theme/ThemeProviderWrapper';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<Provider store={store}>
			<BrowserRouter>
				<ThemeProviderWrapper>
					<Toaster position="top-right" reverseOrder={false} />
					<App />
				</ThemeProviderWrapper>
			</BrowserRouter>
		</Provider>
	</StrictMode>
);
