import React from 'react';

export default props => (
  <form onSubmit={props.handleSubmit}>
    <input
      type="text"
      autoFocus
      className="new-todo"
      onChange={props.handleChange}
      value={props.currentTodo}
      placeholder="What needs to be done?"
    />
  </form>
);
