import { stayService } from '../../services/stay-service';
import { userService } from '../../services/user-service';
import ReactStars from 'react-rating-stars-component';
import { utilService } from '../../services/util-service';
import { Component } from 'react';
import Avatar from "../../assets/img/avatar.png"


export class AddReview extends Component {
	state = {
		review: {
			txt: 'enter review',
			avgRate: 0,
			category: {
				Cleanliness: 0,
				Accuracy: 0,
				Communication: 0,
				Location: 0,
				'Check-in': 0,
				Accessibility: 0,
			},
            user:{
                "_id" : "123456789",
                "fullname" : "Guest",
                "imgUrl" : Avatar,
                "time" : Date.now()
            }
		},
	};
	handleRateChange = (rate, key) => {

		this.setState({
			review: {
				...this.state.review,
				category: { ...this.state.review.category, [key]: rate },
			},
		});
		// }
		console.log(this.state);
	};
	handleChange = ({ target }) => {
		let { value } = target;
		this.setState({ review: { ...this.state.review, txt: value } });
	};

	saveReview = () => {
		const currReview = this.state.review;
		const cat = this.state.review.category;
		let avg = 0;
		for (const key in cat) {
			avg += cat[key];
		}
        const user=userService.getLoggedinUser()
        if(user){
            currReview.user.imgUrl=user.imgUrl
            currReview.user.fullname=user.fullname
            currReview.user._id=user._id
            currReview.user.time=Date.now()
        }
		currReview.avgRate = avg / 6;
		currReview._id = utilService.makeId();
		this.props.addReview(currReview);
	};
	render() {
		return (
			<section className="stay-review">
				<label htmlFor="">Location</label>
				<ReactStars
					count={5}
					onChange={(rate) => {
						this.handleRateChange(rate, 'Location');
					}}
					size={32}
					isHalf={true}
					activeColor="#ff385c"
				/>
				<label htmlFor="">Check-in</label>
				<ReactStars
					count={5}
					onChange={(rate) => {
						this.handleRateChange(rate, 'Check-in');
					}}
					size={32}
					isHalf={true}
					activeColor="#ff385c"
				/>
				<label htmlFor="">Accessibility</label>
				<ReactStars
					count={5}
					onChange={(rate) => {
						this.handleRateChange(rate, 'Accessibility');
					}}
					size={32}
					isHalf={true}
					activeColor="#ff385c"
				/>
				<label htmlFor="">Communication</label>
				<ReactStars
					count={5}
					onChange={(rate) => {
						this.handleRateChange(rate, 'Communication');
					}}
					size={32}
					isHalf={true}
					activeColor="#ff385c"
				/>
				<label htmlFor="">Accuracy</label>
				<ReactStars
					count={5}
					onChange={(rate) => {
						this.handleRateChange(rate, 'Accuracy');
					}}
					size={32}
					isHalf={true}
					activeColor="#ff385c"
				/>
				<label htmlFor="">Cleanliness-in</label>
				<ReactStars
					id="clean"
					classNames="rate-clean"
					count={5}
					onChange={(rate) => {
						this.handleRateChange(rate, 'Cleanliness');
					}}
					size={32}
					isHalf={true}
					activeColor="#ff385c"
				/>
				<textarea
					type="text"
					name="txt"
					autoComplete="off"
					onChange={this.handleChange}
					value={this.state.review.txt}
				/>
				<button onClick={this.saveReview}> send </button>
			</section>
		);
	}
}
