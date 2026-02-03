import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import AuthoPage from './pages/AuthoPage/AuthoPage';
import './App.css'
import { createContext, useState, type Dispatch, type SetStateAction } from 'react';
import type { ApiError, UserData } from './types';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import MainPage from './pages/MainPage/MainPage';
import NavBar from './components/NavBar/NavBar';
import RoadmapPage from './pages/RoadmapPage/RoadmapPage';
import VerificationPage from './pages/VerificationEmail/Verification';
import GoogleVerification from './pages/GoogleVerification/GoogleVerification';


const MainLayout = () => {
  return (
    <>
    <NavBar/>
     <main style={{ paddingTop:'56px' }}>
      <Outlet />
     </main>
    </> )
};

export const AppContext = createContext<{
  error: ApiError
  setError: Dispatch<SetStateAction<ApiError>>
  isLoading: boolean
  setIsLoading: Dispatch<SetStateAction<boolean>>
  userData: UserData
  setUserData: Dispatch<SetStateAction<UserData>>
} | null>(null)

function App() {
  const [error, setError] = useState<ApiError>({isError: false, detail: undefined})
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [userData, setUserData] = useState<UserData>({email: ""})
  const values = {error, isLoading, setError, setIsLoading, userData, setUserData}
  return (
    <AppContext.Provider value={values}>
      <BrowserRouter>
          <Routes>
              <Route path="/login" element={<AuthoPage />} />
              <Route path="/login/oauth/google" element={<GoogleVerification />} />
              <Route path="/reg" element={<RegisterPage />} />
              <Route path="/verify-email" element={<VerificationPage />} />
              <Route element={<MainLayout/>}>
                 <Route path="/graph" element={<MainPage/>} />
                 <Route path="/" element={<RoadmapPage/>} />
              </Route>
          </Routes>
      </BrowserRouter>
    </AppContext.Provider>
      
  );
}

export default App;