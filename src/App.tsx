
import AdvertisementsPage from "./components/pages/AdvertisementsPage.tsx";
import Layout from "./components/layout/Layout.tsx";

import {BrowserRouter, Routes, Route} from "react-router";
import LandingPage from "./components/pages/LandingPage.tsx";
import AdvertisementDetailsPage from "./components/pages/AdvertisementDetailsPage.tsx";
import AdvertisementCreatePage from "./components/pages/AdvertisementCreatePage.tsx";

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/advertisements/all-ads" element={<AdvertisementsPage />} />
            <Route path="/advertisements/new" element={<AdvertisementCreatePage />} />
            <Route
              path="/advertisements/:uuid"
              element={<AdvertisementDetailsPage />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
