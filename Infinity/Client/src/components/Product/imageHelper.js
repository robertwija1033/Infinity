export const uploadImages = async (files) => {
  const images = [];

  for (const file of files) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "y25euhpf");
    formData.append("cloud_name", "dctujs5ds");

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dctujs5ds/upload",
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();

      images.push(data.secure_url);
    } catch (err) {
      console.log(err);
    }
  }

  return images;
};
