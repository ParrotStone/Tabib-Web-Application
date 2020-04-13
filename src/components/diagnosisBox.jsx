import React from "react";
import MessageBox from "./common/messageBox";
import Swal from "sweetalert2";
import ImgUpload from "../images/img-upload.png";
import http from "../services/httpService";
import config from "../config.json";

class DiagnosisBox extends React.Component {
  // TODO: Remember also to check the packages installed and remove the ones un-necessary especially to (sweetalert thingie) and any un-needed ones in general, also separate the devDependencies from the required ones

  // The asynchronous part is to wait for the user until it uploads an image -- replace the ugly input field with a button(custom one, figure out how to make one -- later of course) + Resolve the padding thing that happen to the logo when the damn loading popup appear/show-up + See what the damn /upload/android doesn't wanna accept the base64 string(returns a 415 unsupported media error) =>> (with content-type already set to => applicatio/json; charset=UTF-8)
  handleSkinClick = async () => {
    const { value: file } = await Swal.fire({
      title: "Select image",
      input: "file",
      width: 800,
      scrollbarPadding: false,
      imageUrl: ImgUpload,
      imageWidth: 250,
      imageHeight: 250,
      position: "center",
      imageAlt: "Upload Image",
      inputAttributes: {
        accept: "image/*",
        "aria-label": "Upload your image",
      },
    });

    // This part is pretty much useless, but for now, it's okay for it to stay here :)
    if (file) {
      const reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onload = (e) => {
        Swal.fire({
          title: "Confirm Upload?",
          scrollbarPadding: false,
          imageUrl: e.target.result,
          imageAlt: "The uploaded picture",
          onAfterClose: () => {
            Swal.showLoading();
          },
        }).then((result) => {
          if (result) {
            reader.readAsDataURL(file);
            reader.onload = async () => {
              const formData = new FormData();
              formData.append("file", file);
              // Do here the AJAX call to the back-end for image diagnosis
              const headers = {
                Authorization: `Bearer ${localStorage.getItem("access-token")}`,
                "Content-Type": "multipart/form-data",
              };

              const {
                data: { ans },
              } = await http.post(config.apiImgPred, formData, { headers });

              let predResult = ans.split("is")[1];

              Swal.fire({
                scrollbarPadding: false,
                icon: "info",
                title: "Your results!",
                text: `It is probably ${predResult} skin disease`,
              });
            };
          }
        });
      };
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
