import './App.css'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Index from './pages';
import { Provider } from 'react-redux';
import store from './redux/store';

function App() {
  return (
    <Provider store={store}>
    <Router>
          <Routes>
            <Route path="/" element={<Index/>} />
          </Routes>
    </Router>
    </Provider>
  )
}

export default App
