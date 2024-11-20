import React from "react";
import ReactAvatarEditor from "react-avatar-editor";
import cloudinary from 'cloudinary';
import Swal from 'sweetalert2';
import dotenv from 'dotenv';
dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  });

class UploadImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: "",
      allowZoomOut: false,
      position: { x: 0.5, y: 0.5 },
      scale: 1,
      rotate: 0,
      borderRadius: 50,
      preview: null,
      width: 250,
      height: 250,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  uploadImage = () => {
    console.log('uploadImage is being called');
    const { image } = this.state;
    const formData = new FormData();
    formData.append('file', image);
    console.log(image);
    formData.append('upload_preset', 'esmz0hyj'); // Replace with your upload preset name
  
    fetch(`https://api.cloudinary.com/v1_1/dfsvqzgse/image/upload`, {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      if (data.secure_url) {
        this.setState({
          image: data.secure_url
        });
        Swal.fire({
          title: 'Success',
          text: 'Image Uploaded on Cloudinary',
          icon: 'success',
          confirmButtonText: 'OK',
          confirmButtonColor: '#3085d6'
        })
      }
    })
    .catch(err => {
      console.error(err);
      Swal.fire({
        title: 'Error !',
        text: 'There is some Error in Uploading Image on Cloudinary',
        icon: 'error',
        confirmButtonText: 'OK',
        confirmButtonColor: '#FF0000'
      })
    });
  };

  handleNewImage = (e) => {
    this.setState({ image: e.target.files[0] });
  };
  handleScale = (e) => {
    const scale = parseFloat(e.target.value);
    this.setState({ scale });
  };
  handlePositionChange = (position) => {
    this.setState({ position });
  };
  setEditorRef = (editor) => (this.editor = editor);

  handleSubmit = (event) => {
    event.preventDefault();
    this.uploadImage();
  };

  render() {
    return (
      <div className="lg:flex gap-3">
        <div>
          <ReactAvatarEditor
            ref={this.setEditorRef}
            scale={parseFloat(this.state.scale)}
            width={this.state.width}
            height={this.state.height}
            position={this.state.position}
            onPositionChange={this.handlePositionChange}
            rotate={parseFloat(this.state.rotate)}
            borderRadius={this.state.width / (100 / this.state.borderRadius)}
            image={this.state.image}
            color={[255, 255, 255, 0.6]}
            className="editor-canvas"
          />
        </div>
        <br />
        <div className="lg:px-2 lg:py-10 justify-center items-center">
          <label>
            <input
              className=""
              name="upload-img-input"
              type="file"
              onChange={this.handleNewImage}
            />
            <h3>Upload Photo</h3>
          </label>
          <br />
          <h3>Zoom</h3>
          <input
            name="scale"
            type="range"
            onChange={this.handleScale}
            min={this.state.allowZoomOut ? "0.1" : "1"}
            max="2"
            step="0.01"
            defaultValue="1"
          />
          <div>
            <button
              className="mt-5 w-1/2 active:scale-[0.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all bg-pink-500 py-3 rounded-lg text-white font-bold"
              onClick={this.handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    );
  }
}
export default UploadImage;