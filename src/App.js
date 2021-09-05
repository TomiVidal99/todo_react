import React, {useState, useRef, Fragment, useEffect} from 'react';
import {useAuthState} from 'react-firebase-hooks/auth';
import {auth, db} from './components/authentication';

//import components
import Header from './components/header';
import List from './components/list';

function App() {
    const [items, setItems] = useState([]);
    const [menuText, setMenuText] = useState(null);
    const [user] = useAuthState(auth);
    const [uid, setUid] = useState(null);
    const [dbPathExists, setDbPathExists] = useState(false);

    // triggered after logout and should clear items
    const handle_logout = () => {
        setItems([]);
    }

    //gets items for db and uid
    useEffect(() => {

        // case when logout, just do not update
        if (!user) return

        // set user id
        const userId = user.multiFactor.user.uid;
        setUid(userId);

        db.collection('data').get()
            .then( (querySnapshot) => {
                const data = querySnapshot.docs.map( doc => doc.data());
                if (data[0]) {
                    //if the data exists retrieve it
                    setItems(data[0].items);
                    setDbPathExists(true);
                }
            })
            .catch( (error) => {
                console.error("Error reading document: ", error);
            });
    }, [user])

    // store user's items in the database
    useEffect( () => {
        if (!user || items.length === 0 || !uid) return;

        //if the data base path exists update data, else create the new path
        if (dbPathExists){
            // exists
            db.collection('data').doc(uid).update({ items: items })
                .then( () => {
                    //console.log("Document successfully written!");
                })
                .catch( (error) => {
                    console.error("Error writing document: ", error);
                });
        } else {
            // create the path
            db.collection('data').doc(uid).set({ items: items }, { merge: true });
            setDbPathExists(true);
        }

    }, [items])

    const menuInput = useRef();

    // add item to the list
    const handle_add_item = (event) => {
        event.preventDefault();

        if (menuInput.current.value === "") return;

        //console.log('New item added: ', menuText);

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
        //console.log(item);
        //console.log(items);
        let newItems = items;
        for (let i = 0; i < items.length; i++) {
            if (items[i].id === item.id) {
                newItems[i].id = item.id;
                newItems[i].content = item.content;
                newItems[i].checkbox = item.checkbox;
            } else {

            }
        }
        setItems([...newItems]);
        //setItems([item, ...items.filter((i) => i.id !== item.id)])
    }

    return (
        <Fragment>
            <Header logout_callback={handle_logout}/>
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
        </Fragment>
    );
}

export default App;
