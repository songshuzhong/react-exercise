/**
 *@file
 *@author sshuzhong
 *@mailTo songshuzhong@baidu.com.cn
 *@Date
 *@desc
 */
import React from "react";
import ReactCrop, { getPixelCrop } from "react-image-crop";

import Modal from "./modal";

import "../../styles/components/cropper.less";

class Cropper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      src: null,
      show: false,
      oldFile: null,
      crop: {},
      pixelCrop: {
        x: 10,
        y: 10,
        width: 80,
        height: 80
      }
    };
    this.onSelectTriger = this.onSelectTriger.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.onSelectFile = this.onSelectFile.bind(this);
    this.onCropChange = this.onCropChange.bind(this);
    this.onImageLoaded = this.onImageLoaded.bind(this);
  }

  onSelectTriger() {
    this.uploadRef.click();
  }

  onSelectFile(e) {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener(
        "load",
        () => {
          this.setState({ src: reader.result });
          this.uploadRef.value = "";
        },
        false
      );
      reader.readAsDataURL(e.target.files[0]);
      this.setState({ show: true, oldFile: e.target.files[0] });
    }
  }

  onCropChange(crop, pixelCrop) {
    this.setState({ crop, pixelCrop });
  }

  onImageLoaded(image) {
    this.imageRef = image;
    this.aspect = 1;
    const scale = 80;
    const { naturalWidth, naturalHeight } = this.imageRef;
    const modalWidth =
      naturalWidth >= naturalHeight ? 640 + 24 * 2 : 320 + 24 * 2;

    let scaleRatio = 80 / 100;
    let { x, y, width, height } = this.getCropValues(
      naturalWidth,
      naturalHeight,
      scaleRatio,
      this.aspect
    );
    while (width > scale || height > scale) {
      scaleRatio -= 0.02;
      ({ x, y, width, height } = this.getCropValues(
        naturalWidth,
        naturalHeight,
        scaleRatio,
        this.aspect
      ));
    }

    const crop = { aspect: this.aspect, x, y, width, height };
    const pixelCrop = getPixelCrop(this.imageRef, crop);

    this.setState({ modalWidth, crop, pixelCrop });
  }

  closeModal() {
    const {
      pixelCrop: { x, y, width, height },
      oldFile: { name, type, uid }
    } = this.state;
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = width;
    canvas.height = height;

    ctx.drawImage(this.imageRef, x, y, width, height, 0, 0, width, height);

    canvas.toBlob(blob => {
      const croppedFile = new File([blob], name, {
        type,
        lastModified: Date.now()
      });
      croppedFile.uid = uid;
      this.getBase64(croppedFile, imageUrl =>
        this.setState(
          {
            show: false,
            src: imageUrl
          },
          () => this.props.getCropImg(croppedFile)
        )
      );
    }, type);
  }

  getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  getCropValues(naturalWidth, naturalHeight, scaleRatio, aspect) {
    const width = ((naturalHeight * scaleRatio * aspect) / naturalWidth) * 100;
    const height = ((naturalHeight * scaleRatio) / naturalHeight) * 100;
    const x = ((naturalWidth * (1 - width / 100)) / 2 / naturalWidth) * 100;
    const y = ((naturalHeight * (1 - height / 100)) / 2 / naturalHeight) * 100;

    return { x, y, width, height };
  }

  render() {
    const btn = {
      border: "1px solid #888",
      borderRadius: "50%",
      width: "80px",
      height: "80px",
      color: "rgb(136, 136, 136)",
      fontSize: "50px",
      lineHeight: "70px",
      textAlign: "center"
    };
    const { src, crop, show } = this.state;
    return (
      <React.Fragment>
        <input
          type="file"
          style={{ display: "none" }}
          onChange={this.onSelectFile}
          ref={ref => (this.uploadRef = ref)}
        />
        {src ? (
          <img
            src={src}
            className="crop-img-btn"
            onClick={this.onSelectTriger}
          />
        ) : (
          <div className="crop-img-btn" onClick={this.onSelectTriger}>
            {" "}
            +{" "}
          </div>
        )}
        <Modal show={show} onOK={this.closeModal} onClose={this.closeModal}>
          {src && (
            <ReactCrop
              src={src}
              crop={crop}
              onChange={this.onCropChange}
              onImageLoaded={this.onImageLoaded}
            />
          )}
        </Modal>
      </React.Fragment>
    );
  }
}

export { Cropper };
export default Cropper;
