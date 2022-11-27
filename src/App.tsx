import { Route, Routes } from 'react-router-dom';
import { SignUpPage, MainPage, WelcomePage, BoardPage, SignInPage } from './pages';
import { Footer, Header } from './components';
import { PrivateRoute } from './components/PrivateRoute/PrivateRoute';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="/board/:id" element={<BoardPage />} />
          <Route path="/main" element={<MainPage />} />
        </Route>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/signin" element={<SignInPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
