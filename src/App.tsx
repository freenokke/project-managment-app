import { Route, Routes } from 'react-router-dom';
import { SignUpPage, MainPage, WelcomePage, SignInPage } from './pages';
import { Header } from './components';

function App() {
  return (
    <>
      <Header />
      <div className="container">
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/main" element={<MainPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/signin" element={<SignInPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
