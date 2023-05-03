
interface ICounter {
    count: number,
    apdate: (x: number) => void
}

function Counter(props: ICounter) {

    return ( 
        <div className="counter">
            <button data-testid='increment' onClick={() => props.apdate(-1)}>-</button>
            <p data-testid='counterValue' >{props.count}</p>
            <button data-testid='decrement'  onClick={() => props.apdate(1)}>+</button>
        </div>
     );
}

export default Counter;