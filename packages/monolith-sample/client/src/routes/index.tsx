import { BrowserRouter, Route, Routes } from 'react-router';
import { Home } from '../pages/Home';
import { SignIn } from '../pages/SignIn';
import { RouteWrapper } from './RouteWrapper';

export const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route
        path="/"
        element={
          <RouteWrapper>
            <Home />
          </RouteWrapper>
        }
      />
      <Route
        path="/sign-in"
        element={
          <RouteWrapper isSignInPage>
            <SignIn />
          </RouteWrapper>
        }
      />
    </Routes>
  </BrowserRouter>
);
