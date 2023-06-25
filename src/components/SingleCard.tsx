import { Card } from "../types/allTypes"

type SingleCardProps = {
    details: {
        src: string
        id: number
        matched: boolean
    }
    handleSelect: (card:Card) => void
    flipped: boolean
    disabled: boolean
}

export default function SingleCard({details, handleSelect, flipped, disabled}:SingleCardProps) {
    
    function handleClick() {
        if (!disabled) {
            handleSelect(details)
        }
    }

    return (
    <div className={`card cursor-pointer ${details.matched ? 'matched' : ''}`}>
        <div className={flipped ? 'flipped' : ''}>
            <div className="front relative">
                <img className="absolute"  src='/img/frame.png' alt='card front' />
                <img  src={details.src} alt='card front' />
            </div>
            <img className="back" onClick={handleClick} src='/img/cover2.png' alt={details.src} />
        </div>
    </div>
    )
}
