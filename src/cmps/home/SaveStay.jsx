import React, { Component } from 'react'
import { connect } from 'react-redux'
import { stayService } from '../services/stay-service'
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
            amenities: [
                "TV",
                "Wifi",
                "Air-conditioning",
                "Smoking allowed",
                "Pets allowed",
                "Cooking basics"
            ],
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
        const { stayId } = this.props.match.params
        if (stayId) {
            stayService.getById(stayId).then((stay) => {
                this.setState({ stay })
            })
        }
    }


    handleChange = ({ target }) => {
        let { name, value, checked } = target
        const { stay } = this.state
        value = name === 'price' ? +value : value
        value = name === 'inStock' ? checked : value
        this.setState({ stay: { ...stay, [name]: value } })
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
                <TextField
                    name="name"
                    variant="outlined"
                    value={stay.name}
                    label="Name"
                    color="primary"
                    onChange={this.handleChange}
                />
                <TextField
                    id="imgUrls"
                    name="imgUrls"
                    variant="outlined"
                    label="imgUrls"
                    type="text"
                    InputProps={{ inputProps: { min: 1, max: 1000 } }}
                    InputLabelProps={{ shrink: true }}
                    onChange={this.handleChange}
                />
                <TextField
                    select
                    name="type"
                    label="Select type"
                    value={stay.type}
                    SelectProps={{ native: true }}
                    variant="outlined"
                    onChange={this.handleChange}
                >
                    <option value="Toddles">Toddles</option>
                    <option value="Educational">Educational</option>
                    <option value="Adult">Adult</option>
                    <option value="Funny">Funny</option>
                </TextField>
          
                <FormControlLabel
                    control={<Switch
                        checked={stay.inStock}
                        name="inStock"
                        color="primary"
                        value={stay.inStock}
                        onChange={this.handleChange}
                    />} label="In Stock" />
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