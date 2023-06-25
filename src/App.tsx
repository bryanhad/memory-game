import { useEffect, useState } from 'react'
import SingleCard from './components/SingleCard'
import { Card } from './types/allTypes'
import Title from './components/Title'
import Button from './components/Button'
import Confetti from 'react-confetti'

const images: { src: string }[] = [
   { src: '/img/cat.png' },
   { src: '/img/monkey.png' },
   { src: '/img/obama.png' },
   { src: '/img/pepe.png' },
   { src: '/img/scepticalDog.png' },
   { src: '/img/spongebob.png' },
]

export default function App() {
   const [cards, setCards] = useState<Card[] | []>([])
   const [selectedOne, setSelectedOne] = useState<Card | null>(null)
   const [selectedTwo, setSelectedTwo] = useState<Card | null>(null)
   const [turns, setTurns] = useState(0)
   const [disabled, setDisabled] = useState(false)
   const [showConfetti, setShowConfetti] = useState(false)
   const [lastScore, setLastScore] = useState(0)

   function shuffleCards() {
      const shuffledCards = [...images, ...images]
         .sort(() => Math.random() - 0.5)
         .map((card) => ({ ...card, id: Math.random(), matched: false }))

      setSelectedOne(null)
      setSelectedTwo(null)
      setTurns(0)
      setCards(shuffledCards)
   }

   useEffect(() => {
      if (selectedOne && selectedTwo) {
         setDisabled(true)
         if (selectedOne.src === selectedTwo.src) {
            cards.forEach((card) => {
               if (card.src === selectedOne.src) {
                  card.matched = true
               }
            })
            reset()
         } else {
            setTimeout(() => reset(), 600)
         }
         setTurns((prev) => prev + 1)
      }
   }, [selectedOne, selectedTwo])

   // show confetti if all of the cards matched property is true
   useEffect(() => {
      if (cards.length > 0) {
         const allCardsMatched = cards.every((card) => card.matched===true)
         if (allCardsMatched) {
            setShowConfetti(true)
            setTimeout(() => {
               setShowConfetti(false)
               setCards([])
            }, 5000);
         }
      }
      setLastScore(turns)
   }, [selectedTwo])

   function handleSelect(card: Card) {
      selectedOne ? setSelectedTwo(card) : setSelectedOne(card)
   }

   function reset() {
      setSelectedOne(null)
      setSelectedTwo(null)
      setDisabled(false)
   }

   return (
      <div className="bg-gradient-to-tr from-fuchsia-900 via-indigo-800 to-sky-900 min-h-screen flex justify-center">
         {showConfetti && <Confetti />}
         <div className="flex flex-col items-center justify-center gap-3 text-white pt-8 max-w-[600px] md:max-w-[700px] pb-[50px]">
            <Title />
            <Button shuffleCards={shuffleCards} setLastScore={setLastScore}  />
            {lastScore !== 0 && cards.length === 0 ? <p>The last game is completed with {lastScore} moves!</p> : ''} 
            {cards.length > 0 && 
            <p>Number of turns : {turns}</p>
            }
            <div className="grid grid-cols-4 gap-3 px-6">
               {cards.map((card) => (
                  <SingleCard
                     key={card.id}
                     details={card}
                     handleSelect={handleSelect}
                     flipped={
                        card === selectedOne ||
                        card === selectedTwo ||
                        card.matched === true
                     }
                     disabled={disabled}
                  />
               ))}
            </div>
         </div>
      </div>
   )
}
