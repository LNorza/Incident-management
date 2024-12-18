import { useState } from 'react'
import styles from '../style/calification.module.css'

interface CalificationProps {
    onRatingChange: (rating: number) => void
}

export const Calification = ({ onRatingChange }: CalificationProps) => {
    const [rating, setRating] = useState<number | null>(null)

    const handleRatingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedRating = Number(event.target.value)
        console.log(rating)
        setRating(selectedRating)
        onRatingChange(selectedRating)
    }

    return (
        <section>
            Calificación del Técnico
            <div className={styles.ratingContainerInfo}>
                <div className={styles.rating}>
                    <input onChange={handleRatingChange} defaultValue={5} name="rating" id="star5" type="radio" />
                    <label htmlFor="star5" />
                    <input onChange={handleRatingChange} defaultValue={4} name="rating" id="star4" type="radio" />
                    <label htmlFor="star4" />
                    <input onChange={handleRatingChange} defaultValue={3} name="rating" id="star3" type="radio" />
                    <label htmlFor="star3" />
                    <input onChange={handleRatingChange} defaultValue={2} name="rating" id="star2" type="radio" />
                    <label htmlFor="star2" />
                    <input onChange={handleRatingChange} defaultValue={1} name="rating" id="star1" type="radio" />
                    <label htmlFor="star1" />
                </div>
            </div>
        </section>
    )
}
