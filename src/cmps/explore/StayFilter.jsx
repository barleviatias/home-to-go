import { Component } from "react";

export class StayFilter extends Component {

    state = {
        stayFilterBy: {
            placeType: '',
            propertyType: '',
            price: 250,
            amenities: {
                TV: false,
                Wifi: false,
                AC: false,
                Smoking_allowed: false,
                Pets_allowed: false,
                Cooking_basics: false
            }
        },
        dynamicModal: {
            modalContent: '',
            modalPosition: {}
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.modalType !== this.props.modalType) {
            this.openModal(this.props.modalType)
        }
    }

    onSetModal = (event, modalKey) => {
        const clickPos = event.target.getBoundingClientRect()
        this.setState({
            dynamicModal: {
                ...this.state.dynamicModal,
                modalPosition: clickPos
            }
        }, () => { this.openModal(modalKey) })
    }

    handleChange = (key, val, isAmenities = false) => {
        if (isAmenities) {
            this.setState({ stayFilterBy: { ...this.state.stayFilterBy, amenities: { ...this.state.stayFilterBy.amenities, [key]: val } } }, () => {
                console.log(this.state.stayFilterBy);
                if (key === 'price') this.openModal('price')
            })
        }
        this.setState({ stayFilterBy: { ...this.state.stayFilterBy, [key]: val } }, () => {
            console.log(this.state.stayFilterBy);
            if (key === 'price') this.openModal('price')
        })
    }

    openModal = (modalKey) => {
        const { placeType, propertyType, price, amenities } = this.state.stayFilterBy
        console.log('modal key', modalKey);
        const dynamicModal = {}
        const { top, left, height, x, y } = this.state.dynamicModal.modalPosition
        switch (modalKey) {
            case 'placeType':
                dynamicModal.modalContent = (<section className="stay-filter-modal">
                    <div className="modal-label">
                        <div onClick={() => this.handleChange('placeType', 'entire place')}>
                            <h4>Entire place</h4>
                            <h5>You'll have the place to yourself</h5>
                        </div>
                        <div onClick={() => this.handleChange('placeType', 'private room')}>
                            <h4>Private room</h4>
                            <h5>You'll have a private room to yourself</h5>
                        </div>
                    </div>
                </section>)
                dynamicModal.modalPosition = { top: 245, left: x }
                break;
            case 'propertyType':
                dynamicModal.modalContent = (<section className="stay-filter-modal">
                    <div className="modal-label">
                        <div onClick={() => this.handleChange('propertyType', 'loft')}>
                            <span>Loft</span>
                        </div>
                        <div onClick={() => this.handleChange('propertyType', 'studio')}>
                            <span>Studio</span>
                        </div>
                        <div onClick={() => this.handleChange('propertyType', 'penthouse')}>
                            <span>Penthouse</span>
                        </div>
                        <div onClick={() => this.handleChange('propertyType', 'ppartment')}>
                            <span>Appartment</span>
                        </div>
                        <div onClick={() => this.handleChange('propertyType', 'hotel')}>
                            <span>Hotel</span>
                        </div>
                        <div onClick={() => this.handleChange('propertyType', 'villa')}>
                            <span>villa</span>
                        </div>
                    </div>
                </section>)
                dynamicModal.modalPosition = { top: 245, left: x }
                break;
            case 'price':
                dynamicModal.modalContent = (<section className="stay-filter-modal">
                    <div className="modal-label">
                        <div>
                            <button className="modal-btn" type={"button"} onClick={() => { this.handleChange('price', (price - 10)) }}>-</button>
                            <span>{price}</span>
                            <button className="modal-btn" type={"button"} onClick={() => { this.handleChange('price', (price + 10)) }}>+</button>
                        </div>
                    </div>
                </section >)
                dynamicModal.modalPosition = { top: 245, left: x }
                break;

            case 'amenities':
                dynamicModal.modalContent = (<section className="stay-filter-modal">
                    <div className="modal-label amenities">
                        <div className={amenities.TV ? 'clicked' : 'unclicked'} >
                            <span >TV</span>
                        </div>
                        <div>
                            <span>Wifi</span>
                        </div>
                        <div>
                            <span>AC</span>
                        </div>
                        <div>
                            <span>Smoking_allowed</span>
                        </div>
                        <div>
                            <span>Pets_allowed</span>
                        </div>
                        <div>
                            <span>Cooking_basics</span>
                        </div>
                    </div>
                </section>)
                dynamicModal.modalPosition = { top: 245, left: x }
                break;
            case '':
                dynamicModal.modalContent = ''
                dynamicModal.modalPosition = { top: 0, left: 0, height: 0, width: 0 }
                break;

            default:
                break;
        }
        this.props.setModalContent(dynamicModal, modalKey)
    }

    render() {



        return (
            <section className="stay-filter">
                <button onClick={(event) => { this.onSetModal(event, 'placeType') }} >Type of place</button>
                <button onClick={(event) => { this.onSetModal(event, 'propertyType') }} >Property type</button>
                <button onClick={(event) => { this.onSetModal(event, 'price') }}>Price</button>
                <button onClick={(event) => { this.onSetModal(event, 'amenities') }} >Amenities</button>
                <button>More filters</button>
            </section>
        )
    }
}