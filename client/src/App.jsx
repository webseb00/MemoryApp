import { Header } from './components/'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { 
  Home,
  Login,
  Register,
  Post
} from './pages/'
import ProtectedRoute from './utils/ProtectedRoute';

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route 
            path="/post/:id" 
            element={
              <ProtectedRoute>
                <Post />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
