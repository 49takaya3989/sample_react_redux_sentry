import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Counter from './Counter'
import About from './About'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Counter />} />
        <Route path='/about' element={<About />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
