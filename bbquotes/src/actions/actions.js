import { FETCH_ALL_NINE, FETCH_ALL, FETCH_JP, FETCH_WW, FETCH_SG, ADD_QUOTE } from './types';

const API_KEY = 'https://breaking-bad-quotes.herokuapp.com/v1/quotes/';

export const fetchQuotes = () => dispatch => {
    fetch(`${API_KEY}9`).then(
        res => res.json()
    ).then(
        data => dispatch({
            type: FETCH_ALL_NINE,
            payload: data 
        })
    );
}

export const fetchAll = () => dispatch => {
    fetch(`${API_KEY}100`).then(
        res => res.json()
    ).then (
        data => dispatch({
            type: FETCH_ALL,
            payload: data 
        })
    )
}

export const fetchSG = () => dispatch => {
    fetch(`${API_KEY}100`).then(
        res => res.json()
    ).then(
        resp => resp.filter(x => x.author === 'Saul Goodman')
    )
    .then(
        data => dispatch ({
            type: FETCH_SG,
            payload: data
        })
    );
}

export const fetchWW = () => dispatch => {
    fetch(`${API_KEY}100`).then(
        res => res.json()
    ).then(
        resp => resp.filter(x => x.author === 'Walter White')
    )
    .then(
        data => dispatch ({
            type: FETCH_WW,
            payload: data
        })
    );
}

export const fetchJP = () => dispatch => {
    fetch(`${API_KEY}100`).then(
        res => res.json()
    ).then(
        resp => resp.filter(x => x.author === 'Jesse Pinkman')
    )
    .then(
        data => dispatch ({
            type: FETCH_JP,
            payload: data
        })
    );
}

export const addQuote = (quote) => dispatch => {
    dispatch({
        type: ADD_QUOTE,
        payload: quote
    })
}