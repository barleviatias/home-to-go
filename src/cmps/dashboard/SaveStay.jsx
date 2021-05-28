import React, { Component } from 'react'
import { connect } from 'react-redux'
import { stayService } from '../../services/stay-service'
import { addStay } from '../../store/actions/stayActions'
import { TextField, Switch, FormControlLabel } from '@material-ui/core'
// import { makeStyles } from '@material-ui/core/styles';
// import Button from '@material-ui/core/Button';
// import IconButton from '@material-ui/core/IconButton';
// import PhotoCamera from '@material-ui/icons/PhotoCamera';
class _StayEdit extends Component {
    state = {
        stay: {
          
            name: "House Of Mor",
            imgUrls: [
                "https://a0.muscache.com/im/pictures/bd67daca-84a4-44e9-952d-11162ba76242.jpg?im_w=1200",
                "https://a0.muscache.com/im/pictures/533919e9-d77c-4dfc-94a5-3b71d6c41792.jpg?im_w=720",
                "https://a0.muscache.com/im/pictures/miso/Hosting-4869137/original/179b4e72-c3ed-4198-b274-bbc4c67276f2.jpeg?im_w=720",
                "https://a0.muscache.com/im/pictures/miso/Hosting-4869137/original/efaab6c2-f21a-40aa-a32a-a37b08711af4.jpeg?im_w=720",
                "https://a0.muscache.com/im/pictures/miso/Hosting-4869137/original/e5a8c40e-f26b-45fb-84c2-55845256e963.jpeg?im_w=720"
            ],
            price: 80.00,
            desc: "Fantastic duplex apartment with three bedrooms, located in the historic area of Paris",
            capacity: 8,
            favorites: [
                {
                    userId: "u109"
                }
            ],
            amenities :{

                "TV":true,
                "Wifi":false,
                "Air-conditioning":false,
                "Smoking allowed":false,
                "Pets allowed":false,
                "Cooking basics":false
            }
            ,
            stayType: "entire place",
            propertyType: "loft",
            host: {
                "_id": "u101",
                "fullname": "Mor Levi",
                "imgUrl": "https://randomuser.me/api/portraits/men/1.jpg"
            },
            loc: {
                "country": "France",
                "countryCode": "PT",
                "address": "Paris, France",
                "lat": -8.61308,
                "lng": 41.1413
            },
        }
    }


    componentDidMount() {
        this.loadStay()
    }
    componentDidUpdate(prevProps) {
        if (prevProps.stays !== this.props.stays) {
            this.props.history.push('/stay')
        }
    }


    loadStay() {
        if(!this.props.match||!this.props.match.params)return 
        const { stayId } = this.props.match.params
        if (stayId) {
            stayService.getById(stayId).then((stay) => {
                this.setState({ stay })
            })
        }
    }


    handleChange = ({ target }) => {
        let { name, value, checked ,unChecked } = target
        // const { stay } = this.state
        value = name === 'price' ? +value : value
        value = name === 'amenities' ? checked : unChecked
        // value = name === 'amenities' ? checked : !checked
        // value = name === 'amenities' ? !checked : value
        // value = name === 'amenities' ? !checked : value
        this.setState({ stay: { ...this.state.stay, amenities: {...this.state.stay.amenities, [name]: value}} } )
    }

    onSaveStay = (ev) => {
        ev.preventDefault()
        const { stay } = this.state
        this.props.addStay(stay)
    }


    render() {
        const { stay } = this.state
        if (!stay) return '' // LOADER
        return (<div className="stay-edit full container flex column align-center">
            <h1>{stay._id ? 'Edit stay' : 'Add new stay'}</h1>
            <form onSubmit={this.onSaveStay} className="flex column align-center" >
            <h3>stay name: <input type="text" name="name" autoComplete="off" onChange={this.handleChange} value={stay.name} /></h3>
            <h3>price: <input type="number" name="price" autoComplete="off" onChange={this.handleChange} value={stay.price} /></h3>
            <h3>description: <input type="text" name="desc" autoComplete="off" onChange={this.handleChange} value={stay.desc} /></h3>
            <input type="checkbox"  name="TV" value="TV" checked={stay.amenities.TV} onChange={this.handleChange}/>
            <label for="vehicle1"> TV</label>
            <input type="checkbox"  name="Wifi" value="Wifi" checked={stay.amenities.Wifi}onChange={this.handleChange}/>
            <label for="vehicle2">Wifi</label>
            <input type="checkbox" id="vehicle3" name="vehicle3" value="Air-conditioning" checked={stay.amenities.Air_conditioning}onChange={this.handleChange}/>
            <label for="vehicle3">Air-conditioning </label>
                <button className="primary-btn">Save</button>
            </form>
        </div>)
    }
}

function mapStateToProps(state) {
    return {
        stays: state.stayModule.stays
    }
}


const mapDispatchToProps = {
    addStay,
}





export const StayEdit = connect(mapStateToProps, mapDispatchToProps)(_StayEdit)