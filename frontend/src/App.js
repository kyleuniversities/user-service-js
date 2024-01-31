import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ViewUsersPage } from './app/component/user/ViewUsersPage';
import { RegisterUserPage } from './app/component/user/RegisterUserPage';
import { EditUserPage } from './app/component/user/EditUserPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<ViewUsersPage />} />
        <Route path="/registration" element={<RegisterUserPage />} />
        <Route path="/users/edit/:id" element={<EditUserPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
