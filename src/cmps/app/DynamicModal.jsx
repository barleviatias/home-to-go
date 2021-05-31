import React from "react";
import { Component } from "react";


export class DynamicModal extends Component {

    componentDidUpdate(prevProps) {
        // if (this.props.modalType) {
            if (prevProps.modalType !== this.props.modalType && this.props.modalType !== '') {
                console.log(prevProps.modalType);

                console.log('openDynamicModal: ', this.props.openDynamicModal);
                console.log('modalType: ', this.props.modalType);
                this.props.openDynamicModal(this.props.modalType)
            }
        // }
    }

    render() {

        const { modalPosition } = this.props

        if (!modalPosition || !modalPosition.top || !modalPosition.left || !modalPosition.height || !modalPosition.width) return ''

        return (
            <React.Fragment>
                <div className="modal-bg"></div>
                <section className="dynamic-modal" style={{ top: modalPosition.top, left: modalPosition.left }}>
                    {this.props.children}
                </section>
            </React.Fragment>
        )
    }
}