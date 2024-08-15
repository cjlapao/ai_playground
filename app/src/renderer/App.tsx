import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Docs from '../Components/DocumentRender/DocumentRender';
import Home from '../Components/Home/Home';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route index element={<Home />} />
        <Route path="/docs" element={<Docs documentName='HOME' />} />
        <Route path="/docs/face_recognition" element={<Docs documentName='FACE_RECOGNITION' />} />
      </Routes>
    </Router>
  );
}
