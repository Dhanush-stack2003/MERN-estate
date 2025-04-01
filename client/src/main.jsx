import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider} from 'react-redux';
import { persistor, store } from './redux/store.js'
import { PersistGate } from 'redux-persist/integration/react';
import UserContextProvider from './components/userContext.jsx';

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <UserContextProvider>
        <App />
      </UserContextProvider>
    </PersistGate>
  </Provider>
);
