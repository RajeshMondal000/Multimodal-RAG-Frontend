import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { DocumentProvider } from './contexts/DocumentContext'
import React from 'react'
import { ChatProvider } from './contexts/ChatContext'
import { SettingsProvider } from './contexts/SettingsContext.tsx'

createRoot(document.getElementById('root')!).render(
    <React.StrictMode>

        <DocumentProvider>

            <ChatProvider>
                
                <SettingsProvider>

                    <App />

                </SettingsProvider>

            </ChatProvider>

        </DocumentProvider>

    </React.StrictMode>
)
