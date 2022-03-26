import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginSignUp from './pages/LoginSignUp';
import MyFeed from './pages/MyFeed';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginSignUp />} />
        <Route path="/myFeed" element={<MyFeed />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
