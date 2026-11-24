import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Nav } from './Nav'
import { Footer } from './Footer'

export function Layout() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return (
    <>
      <a href="#conteudo" className="skip">Pular para o conteúdo</a>
      <Nav />
      <main id="conteudo" key={pathname} className="page">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
