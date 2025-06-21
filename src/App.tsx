import './App.css'
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom' // Import Navigate
import Index from './pages';
import { Provider, useSelector } from 'react-redux';
import store, { RootState } from './redux/store';
import { useEffect } from 'react';
import NotFoundPage from './pages/not_found';
import HomePage from './pages/home';
import SurahsPage from './pages/surahs_page';

function AppContent() {
  const currentTheme = useSelector((state: RootState) => state.Theme.theme);
  const currentSurah = useSelector((state: RootState) => state.CurrentSurah.number);


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
        <Route
          path="/"
          element={<Index/>}
          children={[
            <Route
              path='/'
              element={currentSurah === 0 ? <HomePage/> : <Navigate to="/surahs" replace />}
            />,
            <Route
              path="surahs"
              element={<SurahsPage />}
            />
          ]}
        />
        {/* <Route
          path="/"
          element={currentSurah === 0 ? <HomePage /> : <Navigate to="/quran" replace />}
        /> */}
        {/* <Route path="/quran" element={<Index />} /> */}
        <Route path="*" element={<NotFoundPage />} />
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
