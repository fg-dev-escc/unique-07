import { BarMenu } from "./barMenu/BarMenu"
import { Footer } from "./footer/Footer"
import { Logo } from "./logo/Logo"


export const Layout = ({children}) => {
  return (
    <div >
      <Logo />
      <BarMenu />
      <main className="contenido">
        {children}
      </main>
      <Footer />
    </div>
  )
}
