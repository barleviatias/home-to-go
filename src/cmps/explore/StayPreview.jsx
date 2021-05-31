import { Link } from 'react-router-dom'

export function StayPreview({ stay , loggedInUser,updateUser}) {

    const getTotalRate = () => {
        const rates = stay.reviews.map(review => review.avgRate)
        const sum = rates.reduce((acc, rate) => {
            acc += rate
            return acc
        }, 0)
        if (sum === 0) return 'new'
        return (sum / rates.length).toFixed(1)
    }
    function toggleWish(stayId){
        console.log(stayId);
        if(!loggedInUser )return false
        if(!loggedInUser.wishlist)loggedInUser.wishlist=[stayId]
        else {
            let match = loggedInUser.wishlist.findIndex((wishId)=>wishId===stayId)
            if(match!==-1){
                loggedInUser.wishlist.splice(match,1)
            }
            else loggedInUser.wishlist.push(stayId)
        }
        updateUser(loggedInUser)
    }
    function checkIsWish(stayId){
        if(!loggedInUser||!loggedInUser.wishlist)return false
        const match =loggedInUser.wishlist.find((wishId)=>wishId===stayId)
        if(match)return true
        return false
    }
    
    return (
        <section >
            <Link to={`/stay/${stay._id}`} className="stay-preview">
                <div className="stay-preview-img">
                    <img src={stay.imgUrls[0]} alt="stay-preview" />
                </div>
                <div className="stay-preview-info">
                    <span className="stay-preview-header">
                        <span className="stay-preview-header-txt">
                            <h3>
                                <span>{stay.propertyType}</span>
                                     •
                                     <span>{stay.loc.country}</span>
                            </h3>
                        </span>
                        <span className="stay-preview-header-rate">
                            <i className="fas fa-star"></i>
                            <p>{getTotalRate()}</p>
                            <p>( {stay.reviews.length} )</p>
                            
                                <button onClick={()=>{toggleWish(stay._id)}} >
                                {!checkIsWish(stay._id)&&<i className="far fa-heart"></i>}
                                {checkIsWish(stay._id)&&<i className="fas fa-heart"></i>}
                                </button>
                        </span>
                    </span>
                    <h3>{stay.name}</h3>
                    <h3><span className="stay-price">${stay.price}</span> / night</h3>
                </div>
            </Link>
        </section>
    )
}