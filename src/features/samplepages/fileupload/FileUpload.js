import React, { useState } from "react";
import axios from "axios";
import BaseLayout from '../../common/BaseLayout/BaseLayout'

function App() {
  const [file, setFile] = useState(null);

  const UPLOAD_ENDPOINT =
    "http://mysite.mydomain.com/api/uploadFile";

  const handleSubmit = async e => {
    e.preventDefault();
    //if await is removed, console log will be called before the uploadFile() is executed completely.
    //since the await is added, this will pause here then console log will be called
    let res = await uploadFile(file);
    console.log(res.data);
  };

  const uploadFile = async file => {
    const formData = new FormData();
    //formData.append("avatar", file);
    formData.append('uploadedFileType',"Invoice");
    formData.append('userOrEmail', "test@test.com");
    formData.append('file', file, file.name);
    return await axios.post(UPLOAD_ENDPOINT, formData, {
      headers: {
        "content-type": "multipart/form-data"
      }
    });
  };

  const handleOnChange = e => {
    console.log(e.target.files[0]);
    setFile(e.target.files[0]);
  };

  return (
    <BaseLayout>
    <form onSubmit={handleSubmit}>
      <h1>React File Upload</h1>
      <input type="file" onChange={handleOnChange} />
      <button type="submit">Upload File</button>
      <br/>
      <a href="http://mysite.mydomain.com/api/downloadAsAttachment?docId=132">File Download as attachement</a>
      <br/>
      <a href="javascript:window.open('http://mysite.mydomain.com/api/downloadFile?docId=132')">File Download as inline in popup</a>
    </form>
    </BaseLayout>
  );
}

export default App;


//Modify the UPLOAD_ENDPOINT with the API URL.
//The uploaded file can be retreived via $_FILES['avatar'] on the server-side(PHP).