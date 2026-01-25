import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import AIRoadmap from './pages/AIRoadmap';
import Hackathons from './pages/Hackathons';
import Internships from './pages/Internships';
import SilentScream from './pages/SilentScream';
import Settings from './pages/Settings';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/ai-roadmap" element={<AIRoadmap />} />
        <Route path="/hackathons" element={<Hackathons />} />
        <Route path="/internship-feed" element={<Internships />} />
        <Route path="/silent-scream" element={<SilentScream />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Router>
  );
}

export default App;
