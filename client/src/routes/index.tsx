import { BrowserRouter, Route, Routes } from 'react-router';
import { Home } from '../pages/Home';
import { Profile } from '../pages/Profile';
import { SignIn } from '../pages/SignIn';
import { SignUp } from '../pages/SignUp';
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
      <Route
        path="/sign-up"
        element={
          <RouteWrapper isSignInPage>
            <SignUp />
          </RouteWrapper>
        }
      />
      <Route
        path="/profile"
        element={
          <RouteWrapper isPrivate>
            <Profile />
          </RouteWrapper>
        }
      />
    </Routes>
  </BrowserRouter>
);
