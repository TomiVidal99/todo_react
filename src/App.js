//import logo from './logo.svg';
import './App.css';
import {useState, useRef} from 'react';

//import components
import Header from './components/header';
import List from './components/list';

const LIST = [
    {
        id: 0,
        content: 'some test value',
        checkbox: true,
    },
    {
        id: 1,
        content: 'some other test value',
        checkbox: false,
    }
]

function App() {
    const [items, setItems] = useState(LIST);
    const [menuText, setMenuText] = useState('');

    const menuInput = useRef();

    // add item to the list
    const handle_add_item = (event) => {
        event.preventDefault();

        if (menuInput.current.value === "") return;

        console.log('New item added: ', menuText);

        const randomId = Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);;

        // add item
        setItems([...items, {
            id: randomId,
            content: menuText,
            checkbox: false
        }]);

        // clear text
        menuInput.current.value = '';

    }

    // remove item
    const handle_remove_item = (id) => {
        setItems(items.filter( (item) => (item.id !== id)));
    }

    // update item
    const handle_update_item = (item) => {
        let newItems = items;
        let index;
        items.forEach( (i) => {
            let iIndex = 0;
            if (i.id === item.id) {
                index = iIndex;
            } else {
                iIndex++;
            }
        });
        newItems[index] = item;
        setItems(newItems);
    }

    return (
        <>
            <Header/>
            <main className="main column jc-c">

                <form onSubmit={handle_add_item} className="menu row jc-c">
                    <input 
                        type="text"
                        className="menu__input"
                        placeholder="add task" 
                        onChange={(event) => {event.preventDefault(); setMenuText(event.target.value)}}
                        ref={menuInput}
                        autoFocus={true}
                    />
                        <button type="submit" className="menu__button btn">
                            ADD TASK
                        </button>
                </form>

                <List 
                    items={items}
                    removeItem={handle_remove_item}
                    updateItem={handle_update_item}
                />

            </main>
        </>
    );
}

export default App;
