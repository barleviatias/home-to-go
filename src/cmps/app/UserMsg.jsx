import React from "react";
import { Component } from "react";


export class UserMsg extends Component {

    // componentDidUpdate(prevProps) {
    //         if (prevProps.modalType !== this.props.modalType && this.props.modalType !== '') {
    //             console.log(prevProps.modalType);

    //             console.log('openDynamicModal: ', this.props.openDynamicModal);
    //             console.log('modalType: ', this.props.modalType);
    //             this.props.openDynamicModal(this.props.modalType)
    //         }
    // }

    render() {



        return (
            <section className="user-msg" >
                {this.props.children}
            </section>
        )
    }
}