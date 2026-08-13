import { Route, Routes } from 'react-router';
import { Rides } from './pages/Rides';
import { SideBar } from './components/SideBar';
import { SignIn } from './pages/SignIn';
import { SignUp } from './pages/SignUp';

function App() {

  return (
    <Routes>
      {/* Authentication */}
      <Route index path='sign-in' element={<SignIn/>} />
      <Route path='sign-up' element={<SignUp />} />

      {/* Main */}
      <Route element={<SideBar />}>
        <Route index element={<Rides />} />
      </Route>
    </Routes>
  );
}

export default App
