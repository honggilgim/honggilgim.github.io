import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Post from './pages/Post'
import Fake from './pages/Fake'
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/fake" element={<Fake />} />
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
      </Routes>
    </Router>
  )
}

export default App

