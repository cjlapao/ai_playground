import { createRoot } from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import store from '../store';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

// Checking th state of the start on login state
window.electron.ipcRenderer.sendMessage('get-start-on-login-state', [])
