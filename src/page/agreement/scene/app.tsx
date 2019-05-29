/**
 *@file
 *@author sshuzhong
 *@mailTo songshuzhong@baidu.com.cn
 *@Date
 *@desc
 */
import React from "react";
import { Carousel, Modal, Button } from "react-bootstrap";
import Cropper from "react-cropper";

import "cropperjs/dist/cropper.css";
import "../../../styles/app.less";

interface IProps {}
interface IState {
  images?: Array<any>;
  currentImg?: number;
  showDialog?: boolean;
}

class App extends React.Component<IProps, IState> {
  video?: any = null;
  cropper?: any = null;
  currentImgRes?: any = null;
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      currentImg: -1,
      showDialog: false
    };
    this.handleCrop = this.handleCrop.bind(this);
    this.handlePushImage = this.handlePushImage.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleSaveModal = this.handleSaveModal.bind(this);
    this.handleSaveImages = this.handleSaveImages.bind(this);
  }

  handlePushImage() {
    const { images } = this.state;
    const scale = 0.3;
    const canvas = document.createElement("canvas");
    canvas.width = this.video.videoWidth * scale;
    canvas.height = this.video.videoHeight * scale;
    canvas
      .getContext("2d")
      .drawImage(this.video, 0, 0, canvas.width, canvas.height);

    images.push({
      width: this.video.width + "px",
      height: this.video.height + "px",
      src: canvas.toDataURL("image/png")
    });

    this.setState({ images });
  }

  handleCarousel(currentImg) {
    this.setState({ showDialog: true, currentImg });
  }

  handleCrop() {
    this.currentImgRes = this.cropper.getCroppedCanvas().toDataURL();
  }

  handleCloseModal() {
    this.setState({ showDialog: false });
  }

  handleSaveModal() {
    const { images, currentImg } = this.state;
    images[currentImg].src = this.currentImgRes;

    this.setState({ showDialog: false, images });
  }

  handleSaveImages() {}

  handleDeleteImage(index) {
    const { images } = this.state;
    images.splice(index, 1);

    if (index === images.length) {
      const node = document.getElementsByClassName("carousel-item")[0];
      node.className = "carousel-item active carousel-item";
    }

    this.setState({ images });
  }

  render() {
    const { images, showDialog, currentImg } = this.state;
    return (
      <div style={{ width: "100%", padding: "10px" }}>
        <div
          style={{
            width: "50%",
            display: "inline-block",
            textAlign: "center"
          }}
        >
          <video
            ref={video => (this.video = video)}
            width="660px"
            height="370px"
            controls={true}
          >
            <source
              type="video/mp4"
              src="http://172.22.148.30:3000/trailer_hd.mp4"
            />
          </video>
          <div
            style={{
              margin: "15px 35%",
              height: "30px",
              lineHeight: "30px",
              backgroundColor: "#7266ba",
              color: "white",
              cursor: "pointer"
            }}
            onClick={this.handlePushImage}
          >
            抽取关键帧
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            width: "50%",
            display: "inline-block",
            textAlign: "center"
          }}
        >
          <Carousel interval={null} controls={false}>
            {images.map((img, index) => (
              <Carousel.Item key={index}>
                <img
                  src={img.src}
                  style={{ width: img.width, height: img.height }}
                  onClick={this.handleCarousel.bind(this, index)}
                />
                <div
                  className="delete"
                  onClick={this.handleDeleteImage.bind(this, index)}
                >
                  +
                </div>
              </Carousel.Item>
            ))}
          </Carousel>
          <div
            style={{
              margin: "15px 35%",
              height: "30px",
              lineHeight: "30px",
              backgroundColor: "#7266ba",
              color: "white",
              cursor: "pointer",
              display: images.length > 0 ? "block" : "none"
            }}
            onClick={this.handleSaveImages}
          >
            保存关键帧
          </div>
        </div>
        <Modal show={showDialog} size="lg">
          <Modal.Body>
            {currentImg >= 0 ? (
              <Cropper
                ref={cropper => (this.cropper = cropper)}
                src={images[currentImg].src}
                style={{ height: 400, width: "100%" }}
                aspectRatio={16 / 9}
                crop={this.handleCrop.bind(this)}
              />
            ) : null}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleCloseModal}>
              取消
            </Button>
            <Button variant="primary" onClick={this.handleSaveModal}>
              保存
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export { App };
export default App;
