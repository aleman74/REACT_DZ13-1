import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import {dataReducer_search_start, dataReducer_valueSelector, set_dataReducer_param_search} from "../store/dataReducer";


export default function Search(props) {

    const {items, loading, error} = useSelector(dataReducer_valueSelector);
    const dispatch = useDispatch();

    const [text, setText] = useState('');


    useEffect(() => {

        // Запускаем поиск
        dispatch(
            dataReducer_search_start(
                set_dataReducer_param_search(text)
            ));

    }, [dispatch, text]);


    const onChange = (evt) => {
        setText(evt.target.value);
    };

    // Ошибка
    if (error)
        return (
            <>
                <input id="my_input" value={text} onChange={onChange} />
                <div id="result">
                    <div className="error">Произошла ошибка!</div>
                    <div className="error">{error}</div>
                </div>
            </>
        );

    // При загрузке отображаем loader
    if (loading)
        return (
            <>
                <input id="my_input" value={text} onChange={onChange} />
                <div id="result">
                    <div className="cssload-container">
                        <div className="cssload-zenith" />
                    </div>
                </div>
            </>
        );

    // Если данных нет, то ничего не отображаем
    if (text === '')
        return (
            <>
                <input id="my_input" value={text} onChange={onChange} />
                <div>Type something to search...</div>
            </>
        );

    // Есть данные и не загрузка
    return (
        <>
            <input id="my_input" value={text} onChange={onChange} />
            <div id="result">
                {items.map(
                    (item) =>
                        <div key={item.id}>{item.name}</div>
                )}
            </div>
        </>
    );

}
