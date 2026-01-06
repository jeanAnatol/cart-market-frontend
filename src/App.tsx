
import AdvertisementsPage from "./components/pages/AdvertisementsPage.tsx";
import Layout from "./components/layout/Layout.tsx";

import {BrowserRouter, Routes, Route} from "react-router-dom";
import LandingPage from "./components/pages/LandingPage.tsx";
import AdvertisementDetailsPage from "./components/pages/AdvertisementDetailsPage.tsx";
import AdvertisementCreatePage from "./components/pages/AdvertisementCreatePage.tsx";
import LoginPage from "./components/pages/LoginPage.tsx";
import RegisterPage from "./components/pages/RegisterPage.tsx";
import MyAccountPage from "./components/pages/MyAccountPage.tsx";
import AdvertisementUpdatePage from "./components/pages/AdvertisementUpdatePage.tsx";
import {AdminRoute} from "./routes/AdminRoute.tsx";
import AdminLayout from "./components/layout/AdminLayout.tsx";
import Forbidden from "./components/pages/Forbidden.tsx";
import {ProtectedRoute} from "./routes/ProtectedRoute.tsx";
import AdminHomePage from "./components/pages/admin/AdminHomePage.tsx";
import AdminVehicleTypePage from "./components/pages/admin/AdminVehicleTypesPage.tsx";
import AdminMakesPage from "./components/pages/admin/AdminMakesPage.tsx";
import AdminModelsPage from "./components/pages/admin/AdminModelsPage.tsx";

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
              element={
              <AdvertisementDetailsPage />
            }
            />
            <Route path="/advertisements/new" element={
              <ProtectedRoute>
              <AdvertisementCreatePage />
              </ProtectedRoute>
            } />
            <Route
              path="/account"
              element={
                <ProtectedRoute>
                  <MyAccountPage />
                </ProtectedRoute>
              }
              
            />
            <Route
              path="/advertisements/update/:uuid"
              element={
                <ProtectedRoute>
                  <AdvertisementUpdatePage />
                </ProtectedRoute>
              }
            />
            <Route path="/advertisements/:uuid" element={<AdvertisementDetailsPage />} />
            <Route path="/forbidden" element={<Forbidden />} />
            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <AdminLayout />
                </AdminRoute>
              }
            >
              <Route index element={<AdminHomePage />} />
              <Route path="vehicle-types" element={<AdminVehicleTypePage  />} />
              <Route path="makes" element={<AdminMakesPage />} />
              <Route path="models" element={<AdminModelsPage />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
