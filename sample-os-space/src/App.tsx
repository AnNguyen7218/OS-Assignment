import './App.css';
import { Provider } from 'react-redux';
import {
  Navigate,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements
} from 'react-router-dom';
import { lazy, Suspense } from 'react';

import { ThemeProvider } from './components/context/ThemeProvider';
import { store } from './redux/store';
import ProtectedRoute from './components/pages/routes/ProtectedRoute';
import AuthLayout from './components/pages/auth/Layout';
import AppLayout from './components/pages/Layout';
import { AuthProvider } from './components/context/AuthProvider';

const Login = lazy(() => import('./components/pages/auth/Login'));
const Admin = lazy(() => import('./components/pages/Admin'));
const Dashboard = lazy(() => import('./components/pages/Dashboard'));
const Onboarding = lazy(() => import('./components/pages/Onboarding'));

const routes = createRoutesFromElements(
  <Route path='/'>
    <Route index element={<Navigate to='/dashboard' replace />} />
    <Route element={<AuthLayout />}>
      <Route path='/login' element={<Login />} />
    </Route>
    <Route element={<AppLayout />}>
      <Route
        path='/admin'
        element={
          <ProtectedRoute>
            <Suspense fallback={<div>Loading page...</div>}>
              <Admin />
            </Suspense>
          </ProtectedRoute>
        }
      />
      <Route
        path='/dashboard'
        element={
          <ProtectedRoute>
            <Suspense fallback={<div>Loading page...</div>}>
              <Dashboard />
            </Suspense>
          </ProtectedRoute>
        }
      />
      <Route
        path='/onboarding'
        element={
          <ProtectedRoute>
            <Suspense fallback={<div>Loading page...</div>}>
              <Onboarding />
            </Suspense>
          </ProtectedRoute>
        }
      />
    </Route>
    <Route path='*' element={<div className='main-text'>Not found!</div>} />
  </Route>
);
const router = createBrowserRouter(routes);

function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <ThemeProvider>
          <RouterProvider router={router} />
        </ThemeProvider>
      </AuthProvider>
    </Provider>
  );
}

export default App;
