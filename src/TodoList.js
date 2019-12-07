import React, { Component } from "react";
import ls, { remove } from 'local-storage'
// import "./Todolist.css"
import "./css2.css"
// class TodoItems extends Component {
//     createTasks(item) {
//         return <li key={item.key}>{item.text}</li>
//     }
//     render() {


//         var todoEntries = JSON.parse(localStorage.getItem("List"));
//         // var todoEntries = this.props.entries;
//         if (todoEntries != null) {
//             var listItems = todoEntries.map(this.createTasks);
//         }
//         return (
//             <ul className="theList">
//                 {listItems}
//             </ul>
//         );
//     }
// };
class TodoList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: []
        }
        this.addItem = this.addItem.bind(this);
    }
    addItem(e) {
        if (this._inputElement.value !== "") {
            var newItem = {
                text: this._inputElement.value,
                done: false,
                key: Date.now()
            };
            this.setState({ items: this.state.items.concat(newItem) }, () => {
                console.log(this.state.items)
                var ListString = JSON.stringify(this.state.items)
                localStorage.setItem("List", ListString)
                this.forceUpdate();
                // ls.set("List", this.state.items)
            });

            this._inputElement.value = "";
        }

        // console.log(this.state.items);
        console.log("ran")
        e.preventDefault();


    }

    delete = (key) => {
        // alert(key)
        var todoEntries = JSON.parse(localStorage.getItem("List"));
        todoEntries.forEach(element => {
            if (element.key == key) {
                element.done = !element.done;
                console.log(element)
            }

        });
        this.setState({ items: todoEntries })
        var updatedTodo = JSON.stringify(todoEntries);
        localStorage.setItem("List", updatedTodo);
        this.forceUpdate();
    }
    createTasks = (item) => {
        return (
            <div >
                <li style={{ display: "flex", justifyContent: "space-between" }} onClick={() => this.delete(item.key)}
                    key={item.key}>
                    <span > {item.text}</span>
                    <div className="thisX" onClick={() => this.remove(item.key)}>
                        <a href="#">X</a>
                    </div>
                </li>

            </div >
        )
    }

    remove = (key) => {
        let todoEntries = JSON.parse(localStorage.getItem("List"));
        var dataRemoved = todoEntries.filter((el) => {
            return el.key !== key;
        });
        this.setState({ items: dataRemoved })
        let updatedTodo = JSON.stringify(dataRemoved);
        localStorage.setItem("List", updatedTodo);
        this.forceUpdate();
    }


    deleteAll = () => {
        let todoEntries = JSON.parse(localStorage.getItem("List"));
        var dataRemoved = todoEntries.filter((el) => {
            return el.done == false;
        });
        this.setState({ items: dataRemoved })
        let updatedTodo = JSON.stringify(dataRemoved);
        localStorage.setItem("List", updatedTodo);
        this.forceUpdate();
    }

    render() {
        var todoEntries = JSON.parse(localStorage.getItem("List"));
        // var todoEntries = this.props.entries;
        if (todoEntries != null) {
            var todo = [];
            var done = [];
            todoEntries.forEach(element => {
                if (element.done == true) {
                    done.push(element);
                } else {
                    todo.push(element);
                }
            });
            var listItems = todo.map(this.createTasks);
            listItems = listItems.reverse()

            var DoneList = done.map(this.createTasks);
            DoneList = DoneList.reverse();
        }
        return (
            <div className="todoListMain">
                <div className="header">
                    <h2>My To Do List</h2>
                    <form onSubmit={this.addItem}>
                        <input id="myInput" ref={(a) => this._inputElement = a} placeholder="enter task">
                        </input>
                        <span className="addBtn" onClick={this.addItem} >+</span>

                    </form>

                </div>
                <div className="header">

                </div>
                <hr></hr>
                <div className="Lists">
                    <h3>To Do:</h3>
                    <ul className="theList">
                        {listItems}
                    </ul>
                    <hr></hr>

                    <h3> Done Items: </h3><button className="button button3" onClick={this.deleteAll}>Delete Done Items</button>
                    <ul className="checked" id="done">
                        {DoneList}
                    </ul>
                </div >
            </div>
        );
    }
}

export default TodoList;