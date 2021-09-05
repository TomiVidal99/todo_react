import React from 'react';
import Item from './item';

const List = ({items, removeItem, updateItem}) => {
    return(
        <ul className="list">
            {items.map( (item) => (
                <Item 
                    key={item.id}
                    id={item.id}
                    content={item.content}
                    checkbox={item.checkbox}
                    removeItem={removeItem}
                    updateItem={updateItem}
                />
            ))}
        </ul>
    )
}

export default List;
