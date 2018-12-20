import React, { Component } from "react";
import Dropzone from "react-dropzone";
import axios from "axios";

import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import faPlusCircle from "@fortawesome/fontawesome-free-solid/faPlusCircle";
import faMinusCircle from "@fortawesome/fontawesome-free-solid/faMinusCircle";
import CircularProgress from "@material-ui/core/CircularProgress";

class FileUpload extends Component {
  constructor() {
    super();
    this.state = {
      uploadedFiles: [],
      uploading: false
    };
  }

  //e = the actual file
  onDrop = files => {
    this.setState({
      uploading: true
    });
    let formData = new FormData();
    const config = {
      header: { "content-type": "multipart/form-data" }
    };
    formData.append("file", files[0]);

    axios.post("/api/users/uploadimage", formData, config).then(response => {
      this.setState(
        {
          uploading: false,
          uploadedFiles: [...this.state.uploadedFiles, response.data]
        },
        () => {
          this.props.imagesHandler(this.state.uploadedFiles);
        }
      );
    });
  };

  onRemove = id => {
    axios.get(`/api/users/removeimage?public_id=${id}`).then(response => {
      let images = this.state.uploadedFiles.filter(file => {
        return file.public_id !== id;
      });

      this.setState(
        {
          uploadedFiles: images
        },
        () => {
          this.props.imagesHandler(images);
        }
      );
    });
  };

  showUploadedImages = () =>
    this.state.uploadedFiles.map(file => (
      <div
        className="dropzone_box"
        key={file.public_id}
        onClick={() => this.onRemove(file.public_id)}
      >
        <div
          className="wrap"
          style={{ background: `url(${file.url}) no-repeat center center / contain` }}
        >
          <FontAwesomeIcon icon={faMinusCircle} style={{ color: "red" }} />
        </div>
      </div>
    ));

  static getDerivedStateFromProps(props, state) {
    if (props.reset) {
      return (state = {
        uploadedFiles: []
      });
    }
    return null;
  }

  render() {
    return (
      <div>
        <section>
          <div className="dropzone clear">
            <Dropzone
              onDrop={e => this.onDrop(e)}
              multiple={false}
              className="dropzone_box"
            >
              <div className="wrap">
                <FontAwesomeIcon
                  icon={faPlusCircle}
                  style={{ color: "green" }}
                />
              </div>
            </Dropzone>
            {this.showUploadedImages()}
            {this.state.uploading ? (
              <div
                className="dropzone_box"
                style={{
                  textAlign: "center",
                  paddingTop: "60px"
                }}
              >
                <CircularProgress style={{ color: "#ddd" }} thickness={8} />
              </div>
            ) : null}
          </div>
        </section>
      </div>
    );
  }
}

export default FileUpload;
