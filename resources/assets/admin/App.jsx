import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router';
import { useSelector } from 'react-redux';
import { selectTFA, selectToken } from './redux/auth/selectors.js';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ScrollToTop } from './components/common/ScrollToTop.jsx';
import AppLayout from './layout/AppLayout.jsx';
import SignIn from './pages/AuthPages/SignIn.jsx';
import PrivateRoutes from './components/PrivateRoutes.jsx';
import SignInTfa from './pages/AuthPages/SignInTfa.jsx';

export default function App() {
  const tfa = useSelector(selectTFA);
  const token = useSelector(selectToken);

  return (
    <Router>
      <ScrollToTop />
      <ToastContainer />
      <Routes>
        <Route
          path="/admin"
          element={!token ? <Navigate to="/admin/login" /> : <Navigate to="/admin/dashboard" />}
        />
        <Route
          path="/admin/login"
          element={token ? <Navigate to="/admin/dashboard" /> : <SignIn />}
        />
        {token && tfa ? <Route path="/admin/login/tfa" element={<SignInTfa />} /> : null}

        <Route path="/admin" element={<AppLayout />}>
          {token && !tfa ? <Route path="*" element={<PrivateRoutes />} /> : null}
        </Route>

        <Route
          path="*"
          element={
            token && tfa ? (
              <Navigate to="/admin/login/tfa" />
            ) : token && !tfa ? (
              <Navigate to="/admin/dashboard" />
            ) : (
              <Navigate to="/admin/login" />
            )
          }
        />
      </Routes>
    </Router>
  );
}
