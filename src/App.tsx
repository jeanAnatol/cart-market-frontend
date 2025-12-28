
import AdvertisementsPage from "./components/pages/AdvertisementsPage.tsx";
import Layout from "./components/layout/Layout.tsx";
import AdvertisementCreateForm from "./components/pages/AdvertisementCreateForm.tsx";




function App() {

  return (
    <>
      <Layout>
        {/*<AdvertisementsPage />*/}
        <AdvertisementCreateForm />
      </Layout>
    </>
  )
}

export default App
