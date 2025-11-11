import React from 'react';
import Main from './components/pages/Main';
import './global.css';
import ProviderWrapper from './ProviderWrapper';
import { APIAdapterProvider } from './context/ApiAdapterContext';

function App() {
    return (
        <APIAdapterProvider>
            <ProviderWrapper>
                <Main />
            </ProviderWrapper>
        </APIAdapterProvider>
    );
}

export default App;
