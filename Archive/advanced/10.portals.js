// Portals provide a first-class way to render children into a 
// DOM node that exists outside the DOM hierarchy of the parent component.

ReactDOM.createPortal(child, container)

render() {
    // React does *not* create a new div. It renders the children into `domNode`.
    // `domNode` is any valid DOM node, regardless of its location in the DOM.
    return ReactDOM.createPortal(
      this.props.children,
      domNode
    );
  }