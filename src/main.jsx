import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import { RouterProvider } from "react-router-dom";
import { router } from "./Router.jsx"
import { ContextProvider } from './Context/Auth.jsx';

import { Provider } from 'react-redux'; // Import the Provider from react-redux
import store from './Redux/store.js';

import './i18n'; // Import i18n configuration for localization

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
        <Provider store={store}> {/* Wrap the RouterProvider with Provider */}
          <ContextProvider>
            <RouterProvider router={router}/>
          </ContextProvider>
        </Provider>
  </React.StrictMode>,
)
