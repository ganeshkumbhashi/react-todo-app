import React from "react";

import styles from "./TodoItem.module.css"

class TodoItem extends React.Component
{
    state = {
        editing: false
    }

    handleEditing = () => {
        console.log("edit mode activated");
        this.setState({
            editing: true
        })
    }

    handleUpdatedDone = event => {
        console.log(event.key);
        if(event.key === 'Enter')
        {
            this.setState({ editing: false});
        }
    }

    render()
    {
        
        const completedStyle = {
            fontStyle: "italic",
            color: "#595959",
            opacity: 0.4,
            textDecoration: "line-through",
          }

          const { completed, id, title } = this.props.todo

          let editMode =  {}
          let viewMode = {}

          if(this.state.editing)
          {
              viewMode.display = "none"
          }
          else
          {
              editMode.display = "none"
          }
          
          return (
            <li className={styles.item} key={id}><input type="checkbox" className={styles.checkbox} checked={completed} onChange={() => this.props.handleChangeProps(id)} /><button onClick={() => this.props.handleDelete(id)}>Delete</button>
            <span style={completed ? completedStyle : null}>
                <div onDoubleClick={this.handleEditing} style={viewMode}>{title}</div>
            </span>
            <input type="text" className={styles.textInput} style={editMode} value={title} onChange={ e => this.props.handleUpdate(e.target.value,id)} onKeyDown={this.handleUpdatedDone}></input>
            </li>
        );
    }
}

export default TodoItem