import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Layout } from '../layout';
import HomeScreen from '../pages/home';
import { RegisterScreen } from '../pages/auth/register/register';
import { UserProvider } from '../context/UserContext';
import Message from '../components/message/Message';

export function RoutesPage() {
  return (
    <Router>
      <UserProvider>
        <Message />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomeScreen />} />
            <Route path="/register" element={<RegisterScreen />}></Route>
          </Route>
        </Routes>
      </UserProvider>
    </Router>
  );
}
