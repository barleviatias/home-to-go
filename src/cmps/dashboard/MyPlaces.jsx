import { Component } from 'react';
import { stayService } from '../../services/stay-service.js'

export class MyPlaces extends Component {

    state = {
        stays: []
    }

    componentDidMount() {
            this.loadHostStays();
    }

    loadHostStays = async () => {
        var userStays = await stayService.getHostStays(this.props.loggedInUser._id);
        this.setState({stays: userStays});
    }


    render() {
        const { stays } = this.state
        if (!stays) return <h3>Loading....</h3>
        return (
            <main>

                <h1>My Stays</h1>
                <table>
                    <thead>
                        <tr>
                            <td>Id</td>
                            <td>Name</td>
                            <td>Precie per night</td>
                            <td>Address</td>
                            <td>Action</td>
                        </tr>
                    </thead>
                    <tbody>
                        {stays.map(stay => {
                            return (
                                <tr key={stay._id}>
                                    <td>{stay._id}</td>
                                    <td>{stay.name}</td>
                                    <td>{stay.price}</td>
                                    <td>{stay.loc.address}</td>
                                    <td>
                                        <button>Edit</button>
                                        <button>Remove</button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </main>
        )
    }
}