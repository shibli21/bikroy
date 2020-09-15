export const handleImageUpload = async (file) => {
  const data = new FormData();
  data.append("file", file[0]);
  data.append("upload_preset", "sickfit");

  const res = await fetch(
    `http://api.cloudinary.com/v1_1/shibli21/image/upload`,
    { method: "POST", body: data }
  );
  const files = await res.json();

  return {
    image: files.secure_url,
    largeImage: files.eager[0].secure_url,
  };
};
