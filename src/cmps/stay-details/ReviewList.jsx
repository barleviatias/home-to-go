import {ReviewPreview} from '../stay-details/ReviewPreview'

export function ReviewList ({ reviews }) {
    return (
        <section className="review-list">
            {reviews.map(review => <ReviewPreview key={review.id} review={review} />)}
        </section>

    )
}