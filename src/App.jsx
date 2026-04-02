import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Post from './pages/Post'
import Category from './pages/Category'
import Fake from './pages/Fake'
import Love from './pages/Love'
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/fake" element={<Fake />} />
        <Route path="/love" element={<Love />} />
        <Route
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        <Route
          path="/post/:id"
          element={
            <Layout>
              <Post />
            </Layout>
          }
        />
        <Route
          path="/category/:seriesName"
          element={
            <Layout>
              <Category />
            </Layout>
          }
        />
      </Routes>
    </Router>
  )
}

export default App

