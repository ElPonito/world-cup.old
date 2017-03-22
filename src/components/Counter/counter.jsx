const Counter = ({counterValue, addOne, removeOne}) => {
    return (
        <div>
            {counterValue}<br/>
            <button onClick={addOne}>+1</button>
            <button onClick={removeOne}>-1</button>
        </div>
    )
}

export default Counter


