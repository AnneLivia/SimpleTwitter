import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AllFeed from './pages/AllFeed';
import LoginSignUp from './pages/LoginSignUp';
import MyFeed from './pages/MyFeed';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginSignUp />} />
        <Route path="/allFeed" element={<AllFeed />} />
        <Route path="/myFeed" element={<MyFeed />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
