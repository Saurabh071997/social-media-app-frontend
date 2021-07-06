import { API_URL, CLOUDINARY_API_URL } from "./config";
import axios from "axios";

export const getProfileData = async (profileId) => {
  const response = await axios.get(`${API_URL}/user/id?searchId=${profileId}`);
  return response;
};

export const updateProfileData = async (updateObj) => {
  const response = await axios.post(`${API_URL}/user/details`, {
    name: updateObj?.name,
    username: updateObj?.username,
    profileImg: updateObj?.profileImg,
    bio: updateObj?.bio,
    location: updateObj?.location,
  });
  return response;
};

export const uploadProfileImg = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "namamb2a");
    let response = await fetch(
      `${CLOUDINARY_API_URL}/image/upload`,
      {
          method: 'POST',
          body: formData,
      }
  );
  response = await response.json()
  return response
  
};
