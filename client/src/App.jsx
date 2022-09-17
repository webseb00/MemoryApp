import { Header } from './components/'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { 
  Home,
  Login,
  Register,
  Post,
  User
} from './pages/'
import ProtectedRoute from './utils/ProtectedRoute';
import Cookies from 'universal-cookie'

function App() {

  const navigate = useNavigate('/')
  const cookies = new Cookies()

  return (
    <>
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
        <Route path="/user/:id" element={<User />} />
      </Routes>
    </>
  );
}

export default App;
