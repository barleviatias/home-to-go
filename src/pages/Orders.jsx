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
            this.loadOrders()
        })

    }

    loadOrders = async () => {
        const orders =await this.props.loadOrders({id:'u105ord',type:'user'})
        // const orders =await this.props.loadOrders({id:this.state.loggedInUser._id,type:'user'})
        console.log(orders);
    }

    render() {

        return (
            <main className="page">
                <h1>Orders</h1>
            </main>
        )
    }
}
