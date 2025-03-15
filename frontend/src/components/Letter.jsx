const Letter = (props) => {
    const { character, status } = props;
    return (
        <div className={status === "correct" ? "text-star" : status === "wrong" ? "text-red-500" : "text-white"}>
            {character}
        </div>
    );
};

export default Letter
