import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ViewUsersPage } from './app/component/user/ViewUsersPage';
import { RegisterUserPage } from './app/component/user/RegisterUserPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<ViewUsersPage />} />
        <Route path="/registration" element={<RegisterUserPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
