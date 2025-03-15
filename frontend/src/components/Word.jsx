import React from 'react'
import Letter from "../components/Letter.jsx"
const Word = (props) => {
    const { status, word } = props

    if (!word) return null;
    if (!status) {
        return null
    }
    //    console.log(status)
    //   console.log(word.split(''))
    return (
        <div className = "flex flex-row">
            {word.split('').map((letter, LetterIndex) => <Letter character={letter} status={status[LetterIndex]}> </Letter>)}
        </div>
    );
}
export default Word
