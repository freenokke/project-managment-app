import { Route, Routes } from 'react-router-dom';
import { SignUpPage, MainPage, WelcomePage, BoardPage, SignInPage } from './pages';
import { Footer, Header } from './components';

function App() {
  return (
    <>
      <Header />
      <div className="container">
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/main" element={<MainPage />} />
          <Route path="/board/:id" element={<BoardPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/signin" element={<SignInPage />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
