import { Header } from './components/'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { 
  Home,
  Login,
  Register
} from './pages/'

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
