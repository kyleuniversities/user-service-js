import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ViewUsersPage } from './app/component/ViewUsersPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<ViewUsersPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
