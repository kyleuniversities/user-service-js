import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ViewUsersPage } from './app/component/user/ViewUsersPage';
import { RegisterUserPage } from './app/component/user/RegisterUserPage';
import { EditUserPage } from './app/component/user/EditUserPage';
import { AppContextManager } from './app/context/AppContextManager';
import { LoginPage } from './app/component/user/LoginPage';

function App() {
  return (
    <AppContextManager>
      <BrowserRouter>
        <Routes>
          <Route index element={<ViewUsersPage />} />
          <Route path="/registration" element={<RegisterUserPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/users/edit/:id" element={<EditUserPage />} />
        </Routes>
      </BrowserRouter>
    </AppContextManager>
  );
}

export default App;
