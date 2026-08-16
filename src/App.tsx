import { Route, Routes } from 'react-router';
import { Rides } from './pages/Rides';
import { Nav } from './components/Nav';
import { SignIn } from './pages/SignIn';
import { SignUp } from './pages/SignUp';
import { Stats } from './pages/Stats';

function App() {

  return (
    <Routes>
      {/* Authentication */}
      <Route index path='sign-in' element={<SignIn/>} />
      <Route path='sign-up' element={<SignUp />} />

      {/* Main */}
      <Route element={<Nav />}>
        <Route index element={<Rides />} />
        <Route path='stats' element={<Stats />} />
      </Route>
    </Routes>
  );
}

export default App
