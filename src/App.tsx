import { Route, Routes } from 'react-router-dom';
import { MainPage, WelcomePage } from './pages';
import { Header } from './components';

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
