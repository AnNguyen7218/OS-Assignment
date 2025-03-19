import './App.css';
import { Provider } from 'react-redux';
import {
  Route,
  Navigate,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements
} from 'react-router-dom';
import { lazy, Suspense } from 'react';

import { ThemeProvider } from './components/context/ThemeProvider';
import { store } from './redux/store';
import ProtectedRoute from './components/pages/routes/ProtectedRoute';
import AuthLayout from './components/pages/auth/Layout';

const Login = lazy(() => import('./components/pages/auth/Login'));
const Admin = lazy(() => import('./components/pages/Admin'));
const Dashboard = lazy(() => import('./components/pages/Dashboard'));
const Onboarding = lazy(() => import('./components/pages/Onboarding'));

function App() {
  const routes = createRoutesFromElements(
    <>
      <Route element={<AuthLayout />}>
        <Route path='/login' element={<Login />} />
      </Route>
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
      <Route path='*' element={<Navigate to='/login' replace />} />
    </>
  );
  const router = createBrowserRouter(routes);

  return (
    <ThemeProvider>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </ThemeProvider>
  );
}

export default App;
