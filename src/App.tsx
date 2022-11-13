import { Route, Routes } from 'react-router-dom';
import { AuthPage, MainPage, WelcomePage } from './pages';
import { Header } from './components';

function App() {
  return (
    <>
      <Header />
      <div className="container">
        <Routes>
          <Route path="/" element={<AuthPage />} />
          <Route path="/main" element={<MainPage />} />
          <Route path="/signup" element={<MainPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
