
const Footer = () => {
  const currentYear:number =  new Date().getFullYear();

  return (
    <>
      <footer className="bg-gray-700 text-white">
        <div className="container mx-auto py-6 text-center">
          @{currentYear} Cart Market, All rights reserved.
        </div>
      </footer>
    </>
  )
}
export default Footer;