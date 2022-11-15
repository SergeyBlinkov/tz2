import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import AppRouter from "./routes/AppRouter";
import {Provider} from "react-redux";
import {store} from "./Redux/ReduxStore";



const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
      <Provider store={store}>
          <AppRouter />
      </Provider>
  </React.StrictMode>
);


