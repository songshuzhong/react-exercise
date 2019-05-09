/**
 *@file
 *@author sshuzhong
 *@mailTo <a href="mailto:songshuzhong@baidu.com.cn">Song ShuZhong</a>
 *@Date
 *@desc
 */
import React from 'react';

import '../../styles/components/modal.less';

class Modal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: props.title,
            okText: props.okText || '确认',
            closeText: props.closeText || '取消'
        };
    }

    render() {
        const {show, onOK, onClose, children} = this.props;
        const {title, okText, closeText} = this.state;
        const mapChild = Object.prototype.toString.call(children) === '[object Object]';

        return (
            <div className='modal-wrapper' style={{display: show ? 'block' : 'none'}}>
                <div className='modal-mask'>
                    <div className='modal-content'>
                        <div className='modal-header'>
                            <h3>{title}</h3>
                            <span className='close-modal-btn' onClick={onClose}>×</span>
                        </div>
                        <div className='modal-body'>
                            {
                                mapChild
                                    ? React.Children.map(children, child => React.cloneElement(child))
                                    : <p dangerouslySetInnerHTML={{__html: children}} />
                            }
                        </div>
                        <div className='modal-footer'>
                            <div className='btn-cancel' onClick={onClose}>{closeText}</div>
                            <div className='btn-continue' onClick={onOK}>{okText}</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export {Modal};
export default Modal;
