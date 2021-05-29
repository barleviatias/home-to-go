import React, { Component } from 'react';
import { connect } from 'react-redux';
import { stayService } from '../../services/stay-service';
// import { uploadImg } from '../../services/cloudinary-service';
import { addStay ,updateStay } from '../../store/actions/stayActions';
import { Upload } from '../Upload';
// import { TextField, Switch, FormControlLabel } from '@material-ui/core';
// import { makeStyles } from '@material-ui/core/styles';
// import Button from '@material-ui/core/Button';
// import IconButton from '@material-ui/core/IconButton';

// import PhotoCamera from '@material-ui/icons/PhotoCamera';
class _StayEdit extends Component {
	state = {
		stay: {
			name: '',
			imgUrls: [],
			price: "",
			desc: 'Fantastic duplex apartment with three bedrooms, located in the historic area of Paris',
			capacity: 8,
			// favorites: [
			//     {
			//         userId: "u109"
			//     }
			// ],
			amenities: {
				TV: true,
				Wifi: false,
				Air_conditioning: false,
				Smoking_allowed: false,
				Pets_allowed: false,
				Cooking_basics: false,
			},
			stayType: '',
			propertyType: '',
			host: {
				_id: this.props.loggedInUser._id,
				fullname: this.props.loggedInUser.fullname,
				imgUrl: this.props.loggedInUser.imgUrl,
			},
			loc: {
				country: 'France',
				countryCode: 'PT',
				address: 'Paris, France',
				lat: -8.61308,
				lng: 41.1413,
			},
			reviews: [],
		},
	};

	componentDidMount() {
		if (this.props.stay) {
            console.log(this.props.stay);
            
            const currAmenities = {};
            this.props.stay.amenities.forEach((amenitie)=>{
                var str = amenitie;
                var res = str.replace(' ', '_');
                // currAmenities.push(res);
                currAmenities[res]=true
            })
            
            this.setState({
                stay: {
                    ...this.props.stay,
					amenities: currAmenities
				},
			});
        }else{
            this.loadStay();
        }

	}
	componentDidUpdate(prevProps) {
		console.log(this.state);
	}

	loadStay() {
		if (!this.props.match || !this.props.match.params) return;
		const { stayId } = this.props.match.params;
		if (stayId) {
			stayService.getById(stayId).then((stay) => {
				this.setState({ stay });
			});
		}
	}
	onUploadImg = (imgState, position) => {
		console.log(imgState.imgUrl);
		this.setState({ stay: { ...this.state.stay, imgUrls: [...this.state.stay.imgUrls, imgState.imgUrl] } })
	}
	handleChange = ({ target }) => {
		console.log(target.value);
		// console.log( target.checked);
		let { name, value, id, checked } = target;
		value = name === 'price' ? +value : value;
		if (id === 'amenities') {
			this.setState({
				stay: {
					...this.state.stay,
					amenities: { ...this.state.stay.amenities, [name]: checked },
				},
			});
		} else {
			this.setState({ stay: { ...this.state.stay, [name]: value } });
		}
		console.log(this.state.stay);
	};

	onSaveStay = (ev) => {
		ev.preventDefault();
		ev.target.value = 'my places';
		// console.log(e);
		const { stay } = this.state;
        if(stay._id){
            this.props.updateStay(stay);
            this.props.toggleMsgModal(<span><i className="far fa-check-circle"></i><h3>Your stay has been updated</h3></span>)
        }
        else{
            this.props.addStay(stay);
            this.props.toggleMsgModal(<span><i className="far fa-check-circle"></i><h3>Your stay has been added</h3></span>)
        }
		this.props.onSelectAction(ev);
	};

	render() {
		const { stay } = this.state;
		if (!stay) return ''; // LOADER
		return (
			<div className="stay-edit full container flex column align-center">
				<h1>{stay._id ? 'Edit stay' : 'Add new stay'}</h1>
				<form onSubmit={this.onSaveStay} className="flex column align-center">
					<h3>
						stay name:{' '}
						<input
							type="text"
							name="name"
							autoComplete="off"
							onChange={this.handleChange}
							value={stay.name}
						/>
					</h3>
					<h3>
						price:{' '}
						<input
							type="number"
							name="price"
							autoComplete="off"
							onChange={this.handleChange}
							value={stay.price}
						/>
					</h3>
					<h3>
						description:{' '}
						<input
							type="text"
							name="desc"
							autoComplete="off"
							onChange={this.handleChange}
							value={stay.desc}
						/>
					</h3>
					<h3>
						capacity:{' '}
						<input
							type="number"
							name="capacity"
							autoComplete="off"
							onChange={this.handleChange}
							value={stay.capacity}
						/>
					</h3>
					<h3>
						stayType:{' '}
						<select name="stayType" onChange={this.handleChange}>
							<option value="entire place">entire place</option>
							<option value="private room">private room</option>
						</select>
					</h3>
					<h3>
						propertyType:{' '}
						<select name="propertyType" onChange={this.handleChange}>
							<option value="loft">loft</option>
							<option value="villa">villa</option>
							<option value="appartment room">appartment</option>
						</select>
					</h3>
					<div>

						<input
							type="checkbox"
							name="TV"
							id="amenities"
							value={stay.amenities.TV}
                            checked={stay.amenities.TV}
							onChange={this.handleChange}
						/>
						<label for="TV"> TV</label>
						<input
							type="checkbox"
							name="Wifi"
							id="amenities"
							value={stay.amenities.Wifi}
                            checked={stay.amenities.Wifi}
							onChange={this.handleChange}
						/>
						<label for="Wifi">Wifi</label>
						<input
							type="checkbox"
							name="Air_conditioning"
							id="amenities"
							value={stay.amenities.Air_conditioning}
                            checked={stay.amenities.Air_conditioning}
							onChange={this.handleChange}
						/>
						<label for="AC">AC </label>
						<input
							type="checkbox"
							name="Smoking_allowed"
							id="amenities"
							value={stay.amenities.Smoking_allowed}
                            checked={stay.amenities.Smoking_allowed}
							onChange={this.handleChange}
						/>
						<label for="AC">Smoking_allowed </label>
						<input
							type="checkbox"
							name="Pets_allowed"
							id="amenities"
							value={stay.amenities.Pets_allowed}
                            checked={stay.amenities.Pets_allowed}
							onChange={this.handleChange}
						/>
						<label for="AC">Pets_allowed </label>
						<input
							type="checkbox"
							name="Cooking_basics"
							id="amenities"
							value={stay.amenities.Cooking_basics}
                            checked={stay.amenities.Cooking_basics}
							onChange={this.handleChange}
						/>
						<label for="AC">Cooking_basics </label>
						<h1>Uploading to cloudinary YAAY!</h1>
						{/* <label>
						{' '}
						Upload your image to cloudinary!
						<input onchange={uploadImg(event)} type="file" />
					</label> */}
					</div>
					<Upload onUploadImg={this.onUploadImg} />
					<Upload onUploadImg={this.onUploadImg} />
					<Upload onUploadImg={this.onUploadImg} />
					<Upload onUploadImg={this.onUploadImg} />
					<Upload onUploadImg={this.onUploadImg} />
					<button className="primary-btn">Save</button>
				</form>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		stays: state.stayModule.stays,
	};
}

const mapDispatchToProps = {
	addStay,updateStay
};

export const StayEdit = connect(mapStateToProps, mapDispatchToProps)(_StayEdit);
