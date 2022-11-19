import { Route, Routes } from 'react-router-dom';
import { SignUpPage, MainPage, WelcomePage, BoardPage, SignInPage } from './pages';
import { Footer, Header } from './components';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/board/:id" element={<BoardPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/signin" element={<SignInPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
