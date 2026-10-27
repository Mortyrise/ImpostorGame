import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { LangProvider } from './LangContext'
import '@fontsource/syne/700.css'
import '@fontsource/syne/800.css'
import '@fontsource/nunito/400.css'
import '@fontsource/nunito/600.css'
import '@fontsource/nunito/700.css'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LangProvider>
      <App />
    </LangProvider>
  </React.StrictMode>
)
