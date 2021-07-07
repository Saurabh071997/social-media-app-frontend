import axios from 'axios'
import { toggleToast } from "../features/toast/toastSlice";

export const setupAuthExceptionHandler = (logoutUser, navigate, dispatch) => {
  const UNAUTHORIZED = 401;
  const FORBIDDEN = 403;
  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error?.response?.status === UNAUTHORIZED) {
        dispatch(toggleToast({ toggle: true, message: "Unauthorised Access" }));
        dispatch(logoutUser());
        navigate("/login");
      } else if (error?.response?.status === FORBIDDEN) {
        dispatch(
          toggleToast({ toggle: true, message: "User Session Expired" })
        );
        dispatch(logoutUser());
        navigate("/login");
      }else if(error?.response?.status === 500){
        // console.log(error?.response)
        dispatch(
            toggleToast({ toggle: true, message: "something went wrong" })
          );
      }

      return Promise.reject(error);
    }
  );
}
