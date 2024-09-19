import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from './pages/Home'
import Document from './pages/Document'
import { RecoilRoot } from 'recoil'

function App() {
  return (
    <RecoilRoot>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/doc/:id' element={<Document />} />
        </Routes>
      </Router>
    </RecoilRoot>
  )
}

export default App
