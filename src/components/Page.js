import React, { Component } from 'react'
import styled from 'styled-components'

import AuthForm from './AuthForm'
import TaskList from './TasksList'
import TaskForm from './TaskForm'

class Page extends Component {
  
  render() {
    return (
      <React.Fragment>
        <AuthForm />
        <TaskForm onSubmit={this.props.createTask}/>
        <TaskList />
      </React.Fragment>
    )
  }
}

export default Page
