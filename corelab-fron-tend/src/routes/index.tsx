import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomeScreen from '../pages/home';
import { Layout } from '../layout';

export function RoutesPage() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomeScreen />} />
        </Route>
      </Routes>
    </Router>
  );
}
