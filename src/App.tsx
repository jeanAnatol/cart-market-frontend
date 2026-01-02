
import AdvertisementsPage from "./components/pages/AdvertisementsPage.tsx";
import Layout from "./components/layout/Layout.tsx";

import {BrowserRouter, Routes, Route} from "react-router-dom";
import LandingPage from "./components/pages/LandingPage.tsx";
import AdvertisementDetailsPage from "./components/pages/AdvertisementDetailsPage.tsx";
import AdvertisementCreatePage from "./components/pages/AdvertisementCreatePage.tsx";
import LoginPage from "./components/pages/LoginPage.tsx";
import ProtectedRoute from "./services/ProtectedRoute.tsx";
import RegisterPage from "./components/pages/RegisterPage.tsx";

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/advertisements/all" element={<AdvertisementsPage />} />
            <Route
              path="/advertisements/:uuid"
              element={<AdvertisementDetailsPage />}
            />
            <Route path="/advertisements/new" element={
              <ProtectedRoute>
              <AdvertisementCreatePage />
              </ProtectedRoute>
            } />
            
            <Route path="/advertisements/:uuid" element={<AdvertisementDetailsPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
