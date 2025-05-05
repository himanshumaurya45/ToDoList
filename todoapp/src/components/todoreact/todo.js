import React,{useEffect , useState} from 'react'
import './style.css'

const getLocalData=()=> {
    const list = localStorage.getItem("mytodo");
    if(list){
        return JSON.parse(list);
    }else{
        return [];
    }
}
const Todo = () => {
    const [inputdata, setinputdata] = useState("");
    const [items, setitems] = useState(getLocalData());
    const [isEditItem, setisEditItem] = useState("");
    const [toggleButton, setToggleButton] = useState(false);

    const addItems = () => {
        if(!inputdata){
            alert("Please fill the data")
        } else if(inputdata && !toggleButton){
            setitems(items.map((curElem) => {
                if(curElem.id === isEditItem){
                    return {...curElem, name: inputdata}
                }
                return curElem;
            })
            );
            setinputdata("");
            setisEditItem(null);
            setToggleButton(false);
        }
        else{
            const myNewInputData = {
                id: new Date().getTime().toString(),
                name: inputdata
            }
            setitems([...items, myNewInputData]);
            setinputdata("");
        }
    }

    const editItem = (index) => {
        const item_todo_edited = items.find((curElem) => {
            return curElem.id === index;
        })
        setinputdata(item_todo_edited.name);
        setisEditItem(index);
        setToggleButton(true);
    }

    const deleteItem = (index) => {
        const updatedItems = items.filter((curElem) => {
            return curElem.id !==index;
        })
        setitems(updatedItems);
    }

    const removeAll = () => {
        setitems([]);
    }

    useEffect(() => {
        localStorage.setItem("mytodo", JSON.stringify(items));
    },[items])
  return (
    <>
        <div className='main-div'>
            <div className='child-div'>
                <figure>
                    <img src="./images/todo (1).svg" alt="todologo" />
                    <figcaption>Add Your List Here</figcaption>
                </figure>
                <div className='addItems'>
                    <input type="text" placeholder='Add Items' className='form-control' value={inputdata} onChange={(event)=> setinputdata(event.target.value)}/>
                    {toggleButton ? <i class='far fa-edit add-btn' onClick={addItems}></i> : <i class='fa fa-plus add-btn' onClick={addItems}></i>}
                </div>
                    {/* show our item */}
                    <div className='showItems'>

                        {items.map((curElem)=> {
                            return (
                                <div className='eachItem' key={curElem.id}>
                                    <h3>{curElem.name}</h3>
                                    <div className='todo-btn'>
                                        <i class='far fa-edit add-btn' onClick={()=> editItem(curElem.id)}></i>
                                        <i class='far fa-trash-alt add-btn' onClick={()=> deleteItem(curElem.id)}></i>
                                    </div>
                                </div>
                            )
                        })}
                    {/* //show our item */}
                    </div>

                <div className='showItems'>
                    <button className='btn effect04' data-sm-link-text="Remove All" onClick={removeAll}>
                        <span>Check List</span>
                    </button>
                </div>
            </div>
        </div>
    </>
  )
}

export default Todo