import { takeEvery, all, takeLatest } from 'redux-saga/effects';
// takeEvery allows us to listen to actions
import * as actionTypes from '../actions/actionTypes';
import { logoutSaga, checkAuthTimeoutSaga, authUserSaga, authCheckStateSaga } from './auth';
import { initIngredientsSaga } from './burgerBuilder';
import { purchaseBurgerSaga, fetchOrdersSaga } from './order';

export function* watchAuth () {
    // insted repeating yield ..
    yield all([
        takeEvery(
            actionTypes.AUTH_INITIATE_LOGOUT,
            logoutSaga), // saga to execute
        takeEvery(
            actionTypes.AUTH_CHECK_TIMEOUT,
            checkAuthTimeoutSaga),
        takeEvery(
            actionTypes.AUTH_USER,
            authUserSaga),
        takeEvery(
            actionTypes.AUTH_CHECK_STATE,
            authCheckStateSaga)
    ]);
    
}

export function* watchBurgerBuilder () {
    yield takeEvery(
        actionTypes.INIT_INGREDIENTS,
        initIngredientsSaga);
}

export function* watchOrder () {
    yield takeLatest( // cancels alredy runnug
        actionTypes.PURCHASE_BURGER,
        purchaseBurgerSaga);
    yield takeEvery(
        actionTypes.FETCH_ORDERS,
        fetchOrdersSaga);
}