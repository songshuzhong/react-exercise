import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactCrop, { getPixelCrop } from 'react-image-crop';
import { Modal } from 'antd';
import 'antd/lib/modal/style/index.css';
import 'antd/lib/button/style/index.css';

import './index.less';
// 修复 IE canvas.toBlob()
import 'canvas-toBlob';

// 修复 IE new File()
try {
    new File([], '');
} catch (e) {
    // @ts-ignore
    File = class File extends Blob {
        constructor(chunks, filename, opts = {}) {
            super(chunks, opts);
            // @ts-ignore
            this.lastModifiedDate = new Date();
            // @ts-ignore
            this.lastModified = +this.lastModifiedDate;
            // @ts-ignore
            this.name = filename; // @ts-ignore
        }
    };
}

const initialState = {
    // Modal
    modalVisible: false,
    modalWidth: 520,
    modalHeight: 368,
    // ReactCrop
    src: null,
    crop: {},
    pixelCrop: {},
};

// 获取 crop 的值
const getCropValues = (naturalWidth, naturalHeight, scaleRatio, aspect) => {
    // 注意，此处 width, height, x, y 均为百分比的值，如 "width: 80"，即为占比 "80%"
    // @link: https://github.com/DominicTobias/react-image-crop#crop-required
    const width = ((naturalHeight * scaleRatio * aspect) / naturalWidth) * 100;
    const height = ((naturalHeight * scaleRatio) / naturalHeight) * 100;
    const x = ((naturalWidth * (1 - width / 100)) / 2 / naturalWidth) * 100;
    const y = ((naturalHeight * (1 - height / 100)) / 2 / naturalHeight) * 100;

    return { x, y, width, height };
};

class ImgCrop extends Component {
    constructor(props) {
        super(props);
        const { width, height } = props;
        // @ts-ignore
        this.aspect = width / height;
        this.state = initialState;
    }

    /**
     * Upload 组件
     */
        // 渲染 Upload 组件
    renderUpload = () => {
        const { children } = this.props;
        // @ts-ignore
        this.Upload = children;

        let lengthErr = false;
        if (Array.isArray(children)) {
            // @ts-ignore
            this.Upload = children[0];
            if (children.length > 1) lengthErr = true;
        }
        // @ts-ignore
        if (lengthErr || !this.Upload.type.defaultProps.beforeUpload) {
            throw new Error('`children` to `ImgCrop` must be only `Upload`');
        }

        // @ts-ignore
        const { accept } = this.Upload.props;
        return {
            // @ts-ignore
            ...this.Upload,
            props: {
                // @ts-ignore
                ...this.Upload.props,
                accept: !accept ? 'image/*' : accept,
                beforeUpload: this.beforeUpload,
            },
        };
    };
    // 格式化 beforeUpload 属性
    beforeUpload = (file, fileList) => {
        return new Promise((resolve, reject) => {
            // @ts-ignore
            this.resolve = resolve;
            // @ts-ignore
            this.reject = reject;

            // @ts-ignore
            const { beforeCrop } = this.props;
            if (beforeCrop && !beforeCrop(file, fileList)) {
                // @ts-ignore
                this.reject();
                return;
            }

            // @ts-ignore
            this.oldFile = file;

            // 读取添加的图片
            const reader = new FileReader();
            reader.addEventListener('load', () => {
                this.setState({
                    modalVisible: true,
                    src: reader.result,
                });
            });
            // @ts-ignore
            reader.readAsDataURL(this.oldFile); // then -> `onImageLoaded`
        });
    };

    /**
     * ReactCrop 组件
     */
        // 完成添加图片
    onImageLoaded = (image) => {
        // @ts-ignore
        const { scale } = this.props;

        // @ts-ignore
        this.imageRef = image;
        // @ts-ignore
        const { naturalWidth, naturalHeight } = this.imageRef;
        const modalWidth = naturalWidth >= naturalHeight ? 640 + 24 * 2 : 320 + 24 * 2;

        let scaleRatio = scale / 100;
        let { x, y, width, height } = getCropValues(
            naturalWidth,
            naturalHeight,
            scaleRatio,
            // @ts-ignore
            this.aspect,
        );
        while (width > scale || height > scale) {
            scaleRatio -= 0.02;
            ({ x, y, width, height } = getCropValues(
                naturalWidth,
                naturalHeight,
                scaleRatio,
                // @ts-ignore
                this.aspect,
            ));
        }

        // @ts-ignore
        const crop = { aspect: this.aspect, x, y, width, height };
        // @ts-ignore
        const pixelCrop = getPixelCrop(this.imageRef, crop);

        this.setState({ modalWidth, crop, pixelCrop });
    };
    // 响应裁切变化
    onCropChange = (crop, pixelCrop) => {
        this.setState({ crop, pixelCrop });
    };

    /**
     * Modal 组件
     */
        // 点击确定
    onOk = async () => {
        // @ts-ignore
        const { pixelCrop } = this.state;
        const { x, y, width, height } = pixelCrop;

        // 获取裁切后的图片
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        // @ts-ignore
        ctx.drawImage(this.imageRef, x, y, width, height, 0, 0, width, height);

        // @ts-ignore
        const { name, type, uid } = this.oldFile;

        canvas.toBlob(async (blob) => {
            // 生成新图片
            const croppedFile = new File([blob], name, { type, lastModified: Date.now() });
            // @ts-ignore
            croppedFile.uid = uid;
            this.setState(initialState);

            // @ts-ignore
            const { beforeUpload } = this.Upload.props;
            if (!beforeUpload) {
                // @ts-ignore
                this.resolve(croppedFile);
                return;
            }

            const result = beforeUpload(croppedFile, [croppedFile]);
            if (!result) {
                // @ts-ignore
                this.reject();
                return;
            }

            if (!result.then) {
                // @ts-ignore
                this.resolve(croppedFile);
                return;
            }

            try {
                const resolvedFile = await result;
                const fileType = Object.prototype.toString.call(resolvedFile);
                if (fileType === '[object File]' || fileType === '[object Blob]') {
                    // @ts-ignore
                    this.resolve(resolvedFile);
                } else {
                    // @ts-ignore
                    this.resolve(croppedFile);
                }
            } catch (err) {
                // @ts-ignore
                this.reject(err);
            }
        }, type);
    };
    // 取消弹窗
    onCancel = () => {
        this.setState(initialState);
    };

    render() {
        // @ts-ignore
        const { modalTitle } = this.props;
        // @ts-ignore
        const { modalVisible, modalWidth, modalHeight, src, crop } = this.state;

        // @ts-ignore-start
        return (
            <>
                {this.renderUpload()}
                {/*
                //@ts-ignore */}
                <Modal
                    visible={modalVisible}
                    width={modalWidth}
                    height={modalHeight}
                    onOk={this.onOk}
                    onCancel={this.onCancel}
                    wrapClassName="antd-img-crop-modal"
                    okText="确认"
                    cancelText="取消"
                    closable={false}
                >
                    {src && (
                        <ReactCrop
                            src={src}
                            crop={crop}
                            onImageLoaded={this.onImageLoaded}
                            onChange={this.onCropChange}
                        />
                    )}
                </Modal>
            </>
        );
        // @ts-ignore-end
    }
}
// @ts-ignore
ImgCrop.propTypes = {
    beforeCrop: PropTypes.func,
    modalTitle: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
    scale: PropTypes.number,
    children: PropTypes.node,
};
// @ts-ignore
ImgCrop.defaultProps = {
    modalTitle: '编辑图片',
    width: 100,
    height: 100,
    scale: 80,
};

export default ImgCrop;
