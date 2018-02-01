import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import Footer from './Footer';
import { saveTodo, loadTodos } from '../lib/service';

export default class TodoApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: [],
      currentTodo: '',
      error: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    loadTodos()
      .then(({ data }) => this.setState({ todos: data }))
      .catch(() => this.setState({ error: true }));
  }

  handleChange(e) {
    this.setState({ currentTodo: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const newTodo = { name: this.state.currentTodo, isComplete: false };
    saveTodo(newTodo)
      .then(({ data }) =>
        this.setState({
          todos: this.state.todos.concat(data),
          currentTodo: ''
        })
      )
      .catch(() => this.setState({ error: true }));
  }

  render() {
    return (
      <Router>
        <div>
          <header className="header">
            <h1>todos</h1>
            {this.state.error && <span className="error">Oh no!</span>}
            <TodoForm
              handleChange={this.handleChange}
              currentTodo={this.state.currentTodo}
              handleSubmit={this.handleSubmit}
            />
          </header>
          <section className="main">
            <TodoList todos={this.state.todos} />
          </section>
          <Footer />
        </div>
      </Router>
    );
  }
}
