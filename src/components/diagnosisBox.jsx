import React from "react";
import MessageBox from "./common/messageBox";
import Swal from "sweetalert2";
import ImgUpload from "../images/img-upload.png";
import http from "../services/httpService";
import config from "../config.json";

class DiagnosisBox extends React.Component {
  // TODO: Remember also to check the packages installed and remove the ones un-necessary especially to (sweetalert thingie) and any un-needed ones in general, also separate the devDependencies from the required ones

  // The asynchronous part is to wait for the user until it uploads an image
  handleSkinClick = async () => {
    const { value: file } = await Swal.fire({
      title: "Select image",
      input: "file",
      width: 900,
      scrollbarPadding: false,
      imageUrl: ImgUpload,
      imageWidth: 250,
      imageHeight: 250,
      position: "center",
      imageAlt: "Upload Image",
      inputAttributes: {
        accept: "image/*",
        "aria-label": "Upload your image"
      }
    });

    // This part is pretty much useless, but for now, it's okay for it to stay here :)
    if (file) {
      const reader = new FileReader();

      reader.onload = e => {
        Swal.fire({
          title: "Confirm Upload?",
          scrollbarPadding: false,
          imageUrl: e.target.result,
          imageAlt: "The uploaded picture"
        }).then(async result => {
          if (result) {
            Swal.fire({
              scrollbarPadding: false,
              icon: "success",
              title: "Success!",
              text: "Your image has been uploaded"
            });

            // Do here the AJAX call to the back-end for image diagnosis
            // const endPoint = `${config.apiEndpoint}upload/`;
            // const { data: response } = await http.post(
            //   endPoint,
            //   reader.readAsDataURL(file)
            // );

            // console.log(response);
          }
        });
      };

      reader.readAsDataURL(file);
    }
  };

  render() {
    return (
      <React.Fragment>
        <MessageBox message={"What do you want to do?!"} />
        <div className="btn-action">
          <button className="btn btn-outline-primary d-block mb-3">
            Speak to Tabib Bot
          </button>
          <button
            className="btn btn-outline-primary d-block"
            onClick={this.handleSkinClick}
          >
            Skin Detection
          </button>
        </div>
      </React.Fragment>
    );
  }
}

export default DiagnosisBox;
