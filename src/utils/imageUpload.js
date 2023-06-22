export const imageUpload = async images => {
  let imgArr = [];
  for (const item of images) {
    const formData = new FormData();

    const lastIndex = item.lastIndexOf('.');
    // const beforeDot = item.slice(0, lastIndex);
    const afterDot = item.slice(lastIndex + 1);

    const _image = {
      uri: item,
      type: `rentz/${afterDot}`,
      name: `rentz/${afterDot}`,
    };
    formData.append('file', _image);
    formData.append('upload_preset', 'gsetaohs');
    formData.append('cloud_name', 'dmiu93fth');
    formData.append('quality', 'auto'); // Add the quality parameter
    formData.append('fetch_format', 'auto'); // Add the fetch_format parameter

    const res = await fetch(
      'https://api.cloudinary.com/v1_1/dmiu93fth/image/upload',
      {
        method: 'POST',
        body: formData,
      },
    );

    const data = await res.json();

    imgArr.push({public_id: data.public_id, url: data.secure_url});
  }
  return imgArr;
};
