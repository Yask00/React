import Hello from '../components/Hello';
import * as actions from '../actions';
import { StoreState } from '../types/index';
import { connect, Dispatch } from 'react-redux';

export function mapStateToProps({ enthusiasmLevel, languageName }: StoreState) {
  return {
    enthusiasmLevel,
    name: languageName,
  };
}

export function mapDispatchToProps(dispatch: Dispatch<actions.EnthusiasmAction>) {
  return {
    onIncrement: () => dispatch(actions.incrementEnthusiasm()),
    // INCREMENT_ENTHUSIASM'
    onDecrement: () => dispatch(actions.decrementEnthusiasm()),
    // 'DECREMENT_ENTHUSIASM'
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Hello);
