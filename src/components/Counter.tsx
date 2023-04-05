
interface ICounter {
    count: number,
    apdate: (x: number) => void
}

function Counter(props: ICounter) {

    return ( 
        <div className="counter">
            <button onClick={() => props.apdate(-1)}>-</button>
            <p>{props.count}</p>
            <button onClick={() => props.apdate(1)}>+</button>
        </div>
     );
}

export default Counter;