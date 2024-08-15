import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Layout } from '../layout';
import HomeScreen from '../pages/home';
import { RegisterScreen } from '../pages/auth/register/register';
import { UserProvider } from '../context/UserContext';
import Message from '../components/message/Message';
import LoginScreen from '../pages/auth/login/login';
import ProfileScreen from '../pages/user/profile';
import CreateTaskScreen from '../pages/tasks/create/create-task';
import TaskScreen from '../pages/tasks/task/task';
import TasksScreen from '../pages/tasks/dashboard/tasks';
import UpdateTaskScreen from '../pages/tasks/update/update-task';
import ResetPasswordScreen from '../pages/auth/resetPassword/resetePassword';
export function RoutesPage() {
  return (
    <Router>
      <UserProvider>
        <Message />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomeScreen />} />
            <Route path="/register" element={<RegisterScreen />}></Route>
            <Route path="/login" element={<LoginScreen />}></Route>
            <Route path="/profile" element={<ProfileScreen />}></Route>
            <Route path="/tasks" element={<TasksScreen />}></Route>
            <Route path="/create-task" element={<CreateTaskScreen />}></Route>
            <Route path="/task/:id" element={<TaskScreen />}></Route>
            <Route path="/edit-task/:id" element={<UpdateTaskScreen />}></Route>
            <Route path="/reset-password" element={<ResetPasswordScreen />}></Route>
          </Route>
        </Routes>
      </UserProvider>
    </Router>
  );
}
