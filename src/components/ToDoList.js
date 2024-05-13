import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

const ToDoList = () => {


    const [value, setValue] = useState('');

    const [todo, setTodo] = useState( JSON.parse(localStorage.getItem('todo')) || []);

    const [ linethrough, setLinethrough] = useState([]);


    const HandleChange = (e)=> {
        setValue(e.target.value)
    }

    console.log(value)


    const handleClick = ()=>{

        setTodo([...todo, value])
        setValue('')
    }


    const HandleLineThrough = (data, event)=> {

        if(event.target.checked === true){

            let filtdata
    
            todo.forEach((element,i) => {
                if( element === data){
                    filtdata = element
                }
            });
    
            setLinethrough([...linethrough, filtdata]);

        }
        else if(event.target.checked === false){

            const filtdata2 = linethrough.filter((element, i)=>{
                return element !== data
            })

            setLinethrough(filtdata2);
            localStorage.setItem('linethrough', JSON.stringify(filtdata2));
        }



    }


    const handleDelete = (data)=> {
        const filtereddata = todo.filter((ele, i)=> {
            return ele !== data
        })  
        setTodo(filtereddata)
    }


    useEffect(()=>{
        localStorage.setItem('todo', JSON.stringify(todo))
    },[todo])



    console.log(linethrough)





  return (
    <>
        <div className='mainbox'>
            <div>
                <h4 className='tocenter'>Grocery List</h4>
                <div className='inpbttn'>
                    <input type="text" className='forminput' value={value} onChange={HandleChange}/>
                    <button className='btn' onClick={handleClick}>Add Items</button>
                </div>
                <div className='items'>
                    {
                        todo.map((ele,index)=> {

                            let linevalue

                            linethrough.forEach((val)=>{
                                if(val === ele){
                                    linevalue = val
                                }
                            })
                            
                            return (

                                <div key={index} className='singleitem'>
                                    <input type="checkbox" onClick={(e)=> HandleLineThrough(ele,e)} />
                                    {

                                        ele === linevalue ? <p style={{ textTransform : 'capitalize', textDecoration : 'line-through'}}>{ele}</p> : <p style={{ textTransform : 'capitalize'}}>{ele}</p>

                                    }
                                    <button className='removebtn' type='button' onClick={()=> handleDelete(ele)}>Delete</button>
                                </div>

                            )
                        })
                    }
                </div>
            </div>
        </div>
    </>
  )
}

export default ToDoList