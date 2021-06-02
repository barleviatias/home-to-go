import React, { Component } from 'react';
import { connect } from 'react-redux';
import { stayService } from '../../services/stay-service';
import { addStay, updateStay } from '../../store/actions/stayActions';
import { Upload } from '../Upload';

class _StayEdit extends Component {
	state = {
		stay: {
			name: '',
			imgUrls: [],
			price: '',
			desc: '',
			capacity: '',
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
				country: '',
				countryCode: '',
				address: '',
				lat: 0,
				lng: 0,
			},
			reviews: [],
		},
	};

	componentDidMount() {
		if (this.props.stayEdit) {
			const currAmenities = {}
			this.props.stayEdit.amenities.forEach((amenitie) => {
				var str = amenitie;
				var res = str.replace(' ', '_');
				currAmenities[res] = true
			})

			this.setState({
				stay: {
					...this.props.stayEdit,
					amenities: currAmenities
				},
			});
		} else {
			this.loadStay();
		}
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
		const imgUrls=this.state.stay.imgUrls
		imgUrls[position]=imgState.imgUrl
		this.setState({ stay: { ...this.state.stay, imgUrls } })
	}

	handleChange = ({ target }) => {
		let { name, value, id, checked } = target;
		value = name === 'price' ? +value : value;
		if (id === 'amenities') {
			this.setState({
				stay: {
					...this.state.stay,
					amenities: { ...this.state.stay.amenities, [name]: checked },
				},
			});
		} 
		else if (name === 'address') {
			this.setState({
				stay: {
					...this.state.stay,
					loc: { ...this.state.stay.loc, [name]: value },
				},
			});
		} 
		else {
			this.setState({ stay: { ...this.state.stay, [name]: value } });
		}
	}

	onSaveStay = (ev) => {
		ev.preventDefault();
		ev.target.value = 'my places';
		const { stay } = this.state;
		if (stay._id) {
			this.props.updateStay(stay);
			this.props.toggleMsgModal(<span><i className="far fa-check-circle"></i><h3>Your stay has been updated</h3></span>)
		}
		else {
			this.props.addStay(stay);
			this.props.toggleMsgModal(<span><i className="far fa-check-circle"></i><h3>Your stay has been added</h3></span>)
		}
		this.props.onSelectAction(ev);
	};

	render() {
		const { stay } = this.state;
		if (this.props.stayEdit &&!stay.imgUrls[0]) return ''
		if (!stay) return ''; // LOADER
		return (
			<section className="stay-edit-container">
				{/* <h1>{stay._id ? 'Edit stay' : 'Add new stay'}</h1> */}
				<form className="stay-edit-form" onSubmit={this.onSaveStay} >
					<section className="stay-edit-header">
						<h1>
							stay name:
							<input
								type="text"
								name="name"
								autoComplete="off"
								onChange={this.handleChange}
								value={stay.name}
							/>
						</h1>
						<div className="stay-edit-short-info">
							<div>
								<span className="stay-rate-display"><i className="fas fa-star"></i><div className="rate-placeholder"></div></span>
								<span>•</span>
								<p>
									Address:
									<input
										type="text"
										name="address"
										autoComplete="off"
										onChange={this.handleChange}
										value={stay.loc.address}
									/>
								</p>
							</div>
							<div>
								<button type="button" ><p><i className="fas fa-external-link-alt"></i>share</p></button>
								<button type="button" className="stay-save-btn"><p><i className="far fa-heart"></i>save</p></button>
							</div>
						</div>
					</section>

					<div className="stay-gallery">
						<Upload userImgUrl={stay.imgUrls[0]} onUploadImg={this.onUploadImg} position={0} />
						<Upload userImgUrl={stay.imgUrls[1]} onUploadImg={this.onUploadImg}position={1} />
						<Upload userImgUrl={stay.imgUrls[2]} onUploadImg={this.onUploadImg} position={2}/>
						<Upload userImgUrl={stay.imgUrls[3]} onUploadImg={this.onUploadImg} position={3}/>
						<Upload userImgUrl={stay.imgUrls[4]} onUploadImg={this.onUploadImg}position={4} />
					</div>

					<section className="stay-edit-info-container">
						<div className="stay-edit-long-info">
							<div className="stay-long-info-header">
								<div className="stay-long-info-header-txt">
									<span>
										capacity:
										<input
											type="number"
											name="capacity"
											autoComplete="off"
											onChange={this.handleChange}
											value={stay.capacity}
										/>
									  •
											stayType:
										<select name="stayType" onChange={this.handleChange}>
											<option value="entire place">entire place</option>
											<option value="private room">private room</option>
										</select>
									 •
											propertyType:
										<select name="propertyType" onChange={this.handleChange} value={stay.propertyType}>
											{/* <option value="">choice type</option> */}
											<option value="loft">loft</option>
											<option value="villa">villa</option>
											<option value="appartment room">appartment</option>
										</select>

									</span>
								</div>
								<img src={stay.host.imgUrl} alt="avatar" />
							</div>

							<div className="stay-feature-container">
								<div>
									<i className="fas fa-home"></i>
									<div>
										<h3>{stay.stayType}</h3>
										<h4>{stay.stayType === 'entire place' ? "You'll have the place to yourself." : "You'll have a private room to yourself."}</h4>
									</div>
								</div>
								<div>
									<i className="fas fa-book-open"></i>
									<div>
										<h3>House rules</h3>
										<h4>This place isn’t suitable for children under 12 and the host doesn’t allow pets.</h4>
									</div>
								</div>
								<div>
									<i className="fas fa-medal"></i>
									<div>
										<h3>{stay.host.fullname} is a Superhost</h3>
										<h4>Superhosts are experienced, highly rated hosts who are committed to providing great stays for guests.</h4>
									</div>
								</div>
								<div>
									<i className="fas fa-bookmark"></i>
									<div>
										<h3>Wifi</h3>
										<h4>Guests often search for this popular amenity</h4>
									</div>
								</div>
							</div>

							<span className="description">
							<h2>description</h2>
								<textarea
									type="text"
									name="desc"
									autoComplete="off"
									onChange={this.handleChange}
									value={stay.desc}
								/>
							</span>
							<div className="amenities-list">
								<h2>Amenities</h2>
								<div>
									<span>
										<input
											type="checkbox"
											name="TV"
											id="amenities"
											value={stay.amenities.TV}
											checked={stay.amenities.TV}
											onChange={this.handleChange}
										/>
										<label for="TV"> TV</label>
									</span>
									<span>
										<input
											type="checkbox"
											name="Wifi"
											id="amenities"
											value={stay.amenities.Wifi}
											checked={stay.amenities.Wifi}
											onChange={this.handleChange}
										/>
										<label for="Wifi">Wifi</label>
									</span>
									<span>
										<input
											type="checkbox"
											name="Air_conditioning"
											id="amenities"
											value={stay.amenities.Air_conditioning}
											checked={stay.amenities.Air_conditioning}
											onChange={this.handleChange}
										/>
										<label for="AC">AC </label>
									</span>
									<span>
										<input
											type="checkbox"
											name="Smoking_allowed"
											id="amenities"
											value={stay.amenities.Smoking_allowed}
											checked={stay.amenities.Smoking_allowed}
											onChange={this.handleChange}
										/>
										<label for="AC">Smoking_allowed </label>
									</span>
									<span>
										<input
											type="checkbox"
											name="Pets_allowed"
											id="amenities"
											value={stay.amenities.Pets_allowed}
											checked={stay.amenities.Pets_allowed}
											onChange={this.handleChange}
										/>
										<label for="AC">Pets_allowed </label>
									</span>
									<span>
										<input
											type="checkbox"
											name="Cooking_basics"
											id="amenities"
											value={stay.amenities.Cooking_basics}
											checked={stay.amenities.Cooking_basics}
											onChange={this.handleChange}
										/>
										<label for="AC">Cooking_basics </label>
									</span>
								</div>
							</div>
						</div>
						<div className="order-form-container">
							<h3 >
								price:{' '}
								<input
									type="number"
									name="price"
									autoComplete="off"
									onChange={this.handleChange}
									value={stay.price}
								/> / night
							</h3>
						</div>
					</section>
					<button type="submit" className="stay-edit-save-btn">Save</button>
				</form>
			</section>
		)
	}
}

function mapStateToProps(state) {
	return {
		stays: state.stayModule.stays,
	};
}

const mapDispatchToProps = {
	addStay, updateStay
};

export const StayEdit = connect(mapStateToProps, mapDispatchToProps)(_StayEdit);
