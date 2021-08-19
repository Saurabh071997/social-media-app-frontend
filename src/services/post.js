import axios from "axios";
import { CLOUDINARY_API_URL, API_URL } from "./config";

export const getPosts = async () => {
  const response = await axios.get(`${API_URL}/post`);
  return response;
};

export const addPost = async (newPostObj) => {
  const response = await axios.post(`${API_URL}/post`, newPostObj);
  return response;
};

export const likeUnlikePost = async (postObj) => {
  const response = await axios.post(`${API_URL}/post/${postObj?.postId}`, {
    action: postObj?.action,
  });
  return response;
};

export const addComment = async (postCommentObj) => {
  const response = await axios.post(
    `${API_URL}/post/${postCommentObj?.postId}`,
    {
      action: postCommentObj?.action,
      comment: postCommentObj?.comment,
    }
  );

  return response;
};

export const uploadImages = async (files) => {
  let imageList = [];
  for (let i = 0; i < files.length; i++) {
    const formData = new FormData();
    formData.append("file", files[i]);
    formData.append("upload_preset", "namamb2a");
    let response = await fetch(`${CLOUDINARY_API_URL}/image/upload`, {
      method: "POST",
      body: formData,
    });
    response = await response.json();
    imageList.push({ mediaType: "IMAGE", mediaUrl: response.secure_url });
 
  }

  return imageList;
};

export const uploadVideos = async (files) => {
  let videoList = [];
  for (let i = 0; i < files.length; i++) {
    const formData = new FormData();
    formData.append("file", files[i]);
    formData.append("upload_preset", "namamb2a");
    let response = await fetch(`${CLOUDINARY_API_URL}/video/upload`, {
      method: "POST",
      body: formData,
    });
    response = await response.json();
    videoList.push({ mediaType: "VIDEO", mediaUrl: response.secure_url });
  }
  return videoList;
};

export const validateMediaSize = (files) => {
  for (let i = 0; i < files?.length; i++) {
    if (files[i].size / (1024 * 1024) > 10) {
      return false;
    }
  }
  return true;
};
