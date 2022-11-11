import { Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';
import WelcomePage from './pages/WelcomePage';
import Header from './components/Header';

function App() {
  return (
    <>
      <Header />
      <div className="container">
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/main" element={<MainPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
