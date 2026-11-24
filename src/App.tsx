import { Route, Routes } from 'react-router-dom'
import { site } from './config/site'
import { Layout } from './components/Layout'
import Home from './pages/Home'
import Projects from './pages/Projects'
import About from './pages/About'
import Contact from './pages/Contact'
import Blog from './pages/Blog'
import Post from './pages/Post'
import ComingSoon from './pages/ComingSoon'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="projetos" element={<Projects />} />
        <Route path="sobre" element={<About />} />
        <Route path="contato" element={<Contact />} />
        <Route path="blog" element={site.blogEnabled ? <Blog /> : <ComingSoon />} />
        <Route path="blog/:slug" element={site.blogEnabled ? <Post /> : <ComingSoon />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
