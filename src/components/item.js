import React, {useState, useRef, useEffect} from "react";

// class for the text that has been checked
const inlineThroughClass = 't-crossed';

const Item = (props) => {
    const [isChecked, setCheckbox] = useState(props.checkbox);
    const [text, setText] = useState(props.content);
    const textReference = useRef();

    //update the line through at the beggining
    useEffect( () => {
        helper_set_inline_through(isChecked);
    }, [isChecked])

    //update the item if any change ocurred
    const handle_update = (checkbox) => {
        props.updateItem({
            id: props.id,
            content: textReference.current.value,
            checkbox: checkbox 
        })
    }

    //set a line through if the item is has the checkbox marked
    const helper_set_inline_through = (check) => {
        if (check === true) {
            textReference.current.classList.add(inlineThroughClass);
        } else {
            textReference.current.classList.remove(inlineThroughClass);
        }
    }

    const handle_checkbox_click = () => {
        setCheckbox(!isChecked);
        handle_update(!isChecked);
        helper_set_inline_through(isChecked);
    }

    const handle_input_change = (event) => {
        setText(event.target.value);
        handle_update(isChecked);
    }

    return(
        <li 
            className="list__item"
            onDoubleClick={handle_checkbox_click}
        >
            <input 
                name="item-check"
                className="item__checkbox"
                checked={isChecked}
                type="checkbox"
                onChange={handle_checkbox_click}
            />
            <input 
                className="item__input"
                onChange={handle_input_change}
                type="text" 
                value={text}
                placeholder="write some task"
                ref={textReference}
            />
            <input 
                name="item-remove"
                className="item__button btn"
                type="button"
                onClick={() => {props.removeItem(props.id)}}
                value="X"
            />
        </li>
    )
}

export default Item;
