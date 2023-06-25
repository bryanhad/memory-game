
export default function Button({
    shuffleCards,
    setLastScore,
}: {
    shuffleCards: () => void
    setLastScore: React.Dispatch<React.SetStateAction<number>>
}) {

    const handleClick = () => {
        shuffleCards()
        setLastScore(0)
    }

    return (
        <button
            onClick={handleClick}
            type="button"
            className="group w-[30vw] max-w-[150px]"
        >
            <img
            className=" group-active:hidden"
            src="/img/play1.png"
            alt="Button1"
            />
            <img
            className="hidden group-active:block"
            src="/img/play2.png"
            alt="Button2"
            />
        </button>
    )
}
