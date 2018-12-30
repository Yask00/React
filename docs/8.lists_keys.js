function ListItem (props) {
    return <li>{props.value}</li>
}

function NumberList (props) {
    const numbers = props.numbers; // [1, 2, 3, 4, 50]
    const listItems = numbers.map((number) => {
         <ListItem key={number.toString()}  // key = '1'
              value={number} />
    });

    return (
        <ul>{listItems}</ul>
    )
}

const number = [1, 2, 3, 4, 50];
ReactDom.render(
    <NumberList numbers={numbers} />,
    document.getElementById('root')
);