import React, {useState, useRef, useEffect} from "react";
import TodoList from './TodoList'
import { v4 as uuidv4 } from 'uuid';

const LOCAL_STORAGE_KEY='App1.todos'

function App() {
  const[todos, setTodos]=useState([])
  const todoNmRef=useRef()
  var flag=true;
  useEffect(()=> {
    //var temp
    
    if (flag) {
    
    flag=false;
    const storedTodos=JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    console.log(storedTodos,'does it exist')
    if (storedTodos !==[]) setTodos(storedTodos)
    console.log(localStorage,'init')}
    
  },[])

  useEffect(()=> {

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
    console.log(todos,'here')
  },[todos])

  function toggleTodo(id) {
    const newTodos= [...todos]
    const todo= newTodos.find(todo =>todo.id===id)
    todo.complete=!todo.complete
    setTodos(newTodos)
  }


  function Addtodo(e) {
    const name=todoNmRef.current.value
    if (name==='') return 
    //console.log(name)
    setTodos(prevTodos=> {
      return [...prevTodos, {id:uuidv4(), name:name, complete:false}]
    })
    todoNmRef.current.value=null
  }

  function ClearTodos() {
    const newTodos = todos.filter(todo=>!todo.complete)
    setTodos(newTodos)
  }

  return (    
      <>
      <TodoList todos={todos} toggleTodo={toggleTodo} />
      <input ref={todoNmRef} type="text"/>
      <button onClick={Addtodo}>add todo</button>
      <button onClick={ClearTodos}>clear comped todos</button>
      <div>{todos.filter(todo=>!todo.complete).length} shut the fuck up</div>     
      </>
  )
}

export default App;
