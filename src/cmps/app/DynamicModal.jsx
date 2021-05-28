import {  Component } from "react";


export class DynamicModal extends Component {

    render() {

        return (
            <section className="dynamic-modal">
                { this.props.children}
            </section>
        )
    }
}