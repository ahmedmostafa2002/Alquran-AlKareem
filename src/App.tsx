import './App.css'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Index from './pages';
import { Provider, useSelector } from 'react-redux';
import store, { RootState } from './redux/store';
import { useEffect } from 'react';
import NotFoundPage from './pages/not_found';

function AppContent() { 
  const currentTheme = useSelector((state: RootState) => state.Theme.theme);

  useEffect(() => {
    const rootElement = window.document.documentElement;
    if (currentTheme === 'dark') {
      rootElement.classList.add('dark');
    } else {
      rootElement.classList.remove('dark');
    }
  }, [currentTheme]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index/>} />
        <Route path="*" element={<NotFoundPage/>} />
      </Routes>
    </Router>
  );
}

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  )
}

export default App
