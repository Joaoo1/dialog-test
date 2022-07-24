import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Home } from './pages/Home';
import { Profile } from './pages/Profile';
import { DefaultLayout } from './pages/_layouts/DefaultLayout';

export const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route
        index
        element={
          <DefaultLayout>
            <Home />
          </DefaultLayout>
        }
      />
      <Route
        path=":id"
        element={
          <DefaultLayout>
            <Profile />
          </DefaultLayout>
        }
      />
    </Routes>
  </BrowserRouter>
);
