// LABELING
<label htmlFor="namedInput">Name:</label>
<input id="namedInput" type="text" name="name" />

// PRAGMATICALLY MANAGING FOCUS
function CustomTextInput(props) {
    return (
      <div>
        <input ref={props.inputRef} />
      </div>
    );
  }
  
  class Parent extends React.Component {
    constructor(props) {
      super(props);
      this.inputElement = React.createRef();
    }
    render() {
      return (
        <CustomTextInput inputRef={this.inputElement} />
      );
    }
  }
  
  // Now you can set focus when required.
  this.inputElement.current.focus();