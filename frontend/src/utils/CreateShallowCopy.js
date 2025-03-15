const CreateShallowCopy = (props) => {
    { textStatus, state } = props
    textStatus.map((words, wordsIndex) => {
        if (wordsIndex === wordIndex) {
            words.map((thisLetter, thisLetterIndex) => {
                if (thisLetterIndex === LetterIndex) {
                    // return shallow copy
                    return { ...thisLetter, status = "correct" }
                }
                return thisLetter

            }
                }
        return words
    })
}

export default CreateShallowCopy;
