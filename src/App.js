import { Route, Routes } from 'react-router-dom';

import { UseGlobalLogic } from './logics/logic';

import LoginSignUpForm from './components/loginSignupForm';
import Profile from './pages/Profile';

function App() {
  const { signInGoogle } = UseGlobalLogic();

  return (
    <div className="h-screen flex justify-center items-center bg-gradient-to-r from-violet-200 to-pink-200">
      <Routes>
        <Route
          path="/"
          element={<LoginSignUpForm signInGoogle={signInGoogle} />}
        />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
