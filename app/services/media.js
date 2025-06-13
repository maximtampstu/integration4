export const uploadMediaToCloudinary = async (file) => {
  const data = new FormData();
  data.append("file", file); 
  data.append("upload_preset", "media_upload_preset"); 

  const response = await fetch("https://api.cloudinary.com/v1_1/dngqj5iyc/auto/upload", {
    method: "POST",
    body: data,
  });

  if (!response.ok) throw new Error("Upload failed");
  return await response.json();
};
