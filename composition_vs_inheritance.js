class PaymentMethodForm extends React.Component {
    render() {
        return (
            <div>
                <input type="text" />
            </div>
        )
    }
}

class CreatePaymentMethodForm extends PaymentMethodForm { // INHERITANCE
    render() {
        const parent = super.render();
        return (
            <div>
                {parent}
                <button>Create</button>
            </div>
        );
    }
}

class UpdatePaymentMethodForm extends PaymentMethodForm { // INHERITANCE
    render() {
        const parent = super.render();
        return (
            <div>
                {parent}
                <button>Update</button>
            </div>
        )
    }
}

class CreatePaymentMethodForm extends React.Component { // COMPOSITION USE REGULARLY
    render() {
        return (
          <div>
            <PaymentMethodForm />
            <button>Create</button>
          </div>
        )
      }
}

class UpdatePaymentMethodForm extends React.Component { // COMPOSITION USE REGULARLY
    render() {
      return (
        <div>
          <PaymentMethodForm />
          <button>Update</button>
        </div>
      )
    }
}

ReactDOM.render(
    (<div>
        <CreatePaymentMethodForm />
        <UpdatePaymentMethodForm />
    </div>),
    document.getElementById('root')
)