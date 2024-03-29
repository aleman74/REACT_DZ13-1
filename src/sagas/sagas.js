import {spawn} from 'redux-saga/effects';
import {watchSearch} from "./searchSaga";


// Коренная sagas - необязательная
export default function *sagas() {
    yield spawn(watchSearch);     // spawn изолирует дочернюю sagas от коренной
}