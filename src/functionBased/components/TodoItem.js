import React, { useState,useEffect } from "react";

import {FaTrash} from "react-icons/fa"

import styles from "./TodoItem.module.css"

const TodoItem = props =>
{
    const [ editing , setEditing ] = useState(false);

    const handleEditing = () => {
        console.log("edit mode activated");
        setEditing(true);
    }

    const handleUpdatedDone = event => {
        console.log(event.key);
        if(event.key === 'Enter')
        {
            setEditing(false);
        }
    }

    useEffect(() => {
        return () => {
          console.log("Cleaning up...")
        }
      }, [])

    const completedStyle = {
        fontStyle: "italic",
        color: "#595959",
        opacity: 0.4,
        textDecoration: "line-through",
      }

      const { completed, id, title } = props.todo

      let editMode =  {}
      let viewMode = {}

      if(editing)
      {
          viewMode.display = "none"
      }
      else
      {
          editMode.display = "none"
      }

    
        
          return (
            <li className={styles.item} key={id}><input type="checkbox" className={styles.checkbox} checked={completed} onChange={() => props.handleChangeProps(id)} /><button onClick={() => props.handleDelete(id)}><FaTrash style={{ color: "orangered", fontSize: "16px" }}/></button>
            <span style={completed ? completedStyle : null}>
                <div onDoubleClick={handleEditing} style={viewMode}>{title}</div>
            </span>
            <input type="text" className={styles.textInput} style={editMode} value={title} onChange={ e => props.handleUpdate(e.target.value,id)} onKeyDown={handleUpdatedDone}></input>
            </li>
        );
    
}

export default TodoItem