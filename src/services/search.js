import axios from "axios";
import { API_URL } from "./config";

export const getUsersByName = async (searchstring) => {
  let queryParamValue = searchstring.split(" ").join("+");
  const response = await axios.get(
    `${API_URL}/user/name?searchname=${queryParamValue}`
  );
  return response;
};
