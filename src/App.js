import axios from 'axios'
import React from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { Routes, Route , useNavigate} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import "./App.css";
import { LandingPage } from "./pages/LandingPage";
import { LoginPage } from "./pages/LoginPage";
import { SignupPage } from "./pages/SignupPage";
import {PrivateRoute} from './components/PrivateRoute'
import {Home} from './components/Home'
import {toggleToast} from "./features/toast/toastSlice"
import {logoutUser, getUserDetails} from './features/auth/authSlice'
import {setupAuthExceptionHandler} from './utils/setAuthExceptionHandler'
import {Profile} from './features/profile/Profile'
import {EditProfile} from './features/profile/EditProfile'
import {Search} from './features/search/Search'

function App() {
  const { toastActive, toastMessage } = useSelector((state) => state.toast);
  const {status, accessToken} = useSelector(state => state.auth)
  // const {status} = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(()=>{
    function notify() {
      setTimeout(() => {
        dispatch(toggleToast({ payload: { toggle: false , message:null} }));
        toast(`${toastMessage}`, {
          className: "toast-class",
          closeButton: true
        });
      }, 1000);
    }
    toastActive && notify()
  },[toastActive, toastMessage, dispatch])

  setupAuthExceptionHandler(logoutUser,navigate, dispatch)

  // useEffect(()=>{
  //   setupAuthExceptionHandler(logoutUser,navigate, dispatch)
  //   // eslint-disable-next-line
  // },[])

  useEffect(()=>{
    if(status === "tokenReceived"){
      axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
      dispatch(getUserDetails())
    }
  },[status, accessToken, dispatch])

  return (
    <div className="App">
      <Routes>
        <Route path="/welcome" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <PrivateRoute path="/" element={<Home/>} />
        <PrivateRoute path="/profile/view/:profileId" element={<Profile/>}/>
        <PrivateRoute path="/profile/edit" element={<EditProfile/>} />
        <PrivateRoute path="/search" element={<Search/>} />
      </Routes>

      <ToastContainer />
    </div>
  );
}

export default App;
