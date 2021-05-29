import { Component } from 'react';
import { loadOrders } from '../store/actions/orderActions';


export class Orders extends Component {

    state = {
        sction: '',
        loggedInUser: null,
        orders: []
    }
    componentDidMount() {
        this.setState({ loggedInUser: this.props.loggedInUser }, () => {
            this.props.loadOrders({id:'u105',type:'user'})
        })

    }


    render() {

        return (
            <main className="page">
                <h1>Orders</h1>
            </main>
        )
    }
}
