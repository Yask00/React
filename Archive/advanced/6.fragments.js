// A common pattern in React is for a component to return multiple elements. 
// Fragments let you group a list of children without adding extra nodes to the DOM.

render() {
    return (
        <React.Fragment>
            <ChildA />
            <ChildB />
            <ChildC />
        </React.Fragment>
    );
}

//MOTIVATION

class Table extends React.Component {
    render() {
        return (
            <table>
                <tr>
                    <Columns />
                </tr>
            </table>
        );
    }
}

class Columns extends React.Component {
    render() {
        return (
            <React.Fragment>
                <td>Hello</td>
                <td>World</td>
            </React.Fragment>
        );
    }
}

// short syntax
class Columns extends React.Component {
    render() {
      return (
        <>
          <td>Hello</td>
          <td>World</td>
        </>
      );
    }
  }

// KEYED FRAGMENTS

function Glossary (props) {
    return (
        <dl>
            {props.items.map(item => (
                <React.Fragment key={item.id}>
                    <dt>{item.term}</dt>
                    <dd>{item.description}</dd>
                </React.Fragment>
            ))}
        </dl>
        
    )
}