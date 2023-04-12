
interface IButtton {
    className: string,
    icon: string,
    text: string
}

function Button(props: IButtton) {

    let cls = 'button ' + props.className

    return ( 
        <div className={cls} >
            <p>{props.text}</p>
            <img src={props.icon} alt="" />
        </div>
     );
}

export default Button;