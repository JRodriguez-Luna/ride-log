import { Route, Routes } from 'react-router';
import { Home } from './pages/Home';
import { NavBar } from './components/NavBar';
import { SignIn } from './pages/SignIn';
import { SignUp } from './pages/SignUp';

function App() {

  return (
    <Routes>
      {/* Authentication */}
      <Route index path='sign-in' element={<SignIn/>} />
      <Route path='sign-up' element={<SignUp />} />

      {/* Main */}
      <Route element={<NavBar />}>
        <Route index element={<Home />} />
      </Route>
    </Routes>
  );
}

export default App
