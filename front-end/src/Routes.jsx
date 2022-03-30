import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AllFeed from './pages/Feed/AllFeed';
import LoginSignUp from './pages/Login/LoginSignUp';
import MyFeed from './pages/Feed/MyFeed';

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
