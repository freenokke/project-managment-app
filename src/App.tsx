import { Route, Routes } from 'react-router-dom';
import {
  SignUpPage,
  MainPage,
  WelcomePage,
  BoardPage,
  SignInPage,
  EditProfilePage,
  NotFound,
} from './pages';
import { ErrorBoundary, Footer, Header } from './components';
import { PrivateRoute } from './components/PrivateRoute/PrivateRoute';

function App() {
  return (
    <ErrorBoundary>
      <Header />
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="/board/:id" element={<BoardPage />} />
          <Route path="/main" element={<MainPage />} />
          <Route path="/edit/profile" element={<EditProfilePage />} />
        </Route>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </ErrorBoundary>
  );
}

export default App;
