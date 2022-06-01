import {take, delay, takeLatest, put, spawn, debounce, fork, call} from 'redux-saga/effects';
import {searchSkills} from "../api/search";
import {
    dataReducer_search_success,
    dataReducer_search_failure,
    set_dataReducer_param_failure,
    set_dataReducer_param_success, dataReducer_search_start
} from "../store/dataReducer";

// ofType(dataReducer_search_start),      //    ofType('data/dataReducer_search_start'),


// filter
function filterSearch({type, payload}) {

    console.log('filterSearch', {type}, {payload});

    const result = (type === 'data/dataReducer_search_start')
                   &&
                   (payload.search.trim() !== '');

    return result;

}

// watcher
/*
export function *watchSearch() {

    while(true) {
        const action = yield take(o =>
            (o.type === 'data/dataReducer_search_start')
            &&
            (o.payload.search.trim() !== '')
        );    // take + fork - просто выполняем все запросы (без отмены предыдущих запросов)   dataReducer_search_start
        yield fork(handleSearch, action);            // fork - join - cancel
    }
}
*/

export function *watchSearch() {

    yield takeLatest(dataReducer_search_start, handleSearch);     // takeLatest - отменяет предыдущую задачу
//    yield debounce(100, dataReducer_search_start, handleSearch);
}


// worker
function *handleSearch(action) {

    console.log('handleSearch', action);

    try{
        let data = [];

        if ((action.payload.search.trim() !== ''))
        {
            const ms = 100;         // Задержка по времени
            yield delay(ms);

            data = yield call(searchSkills, action.payload.search);       // call - вызов любой функции (блокирующий)
        }

        yield put(
                dataReducer_search_success(
                    set_dataReducer_param_success(data)
                ));
    }catch(ex) {
        yield put(
                dataReducer_search_failure(
                    set_dataReducer_param_failure(ex.message)
                ));
    }
}
