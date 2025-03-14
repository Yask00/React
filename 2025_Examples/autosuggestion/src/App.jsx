import './App.css';
import { Form } from 'react-bootstrap';
import InputControl from './components/InputControl';

function App() {
  return (
    <div className="main">
      <h1>React AutoSuggestion Demo</h1>
      <div className="search-form">
        <Form>
          <InputControl
            name="country"
            label="Enter Country"
            placeholder="Type a country name"
          />
        </Form>
      </div>
    </div>
  );
}

export default App;
