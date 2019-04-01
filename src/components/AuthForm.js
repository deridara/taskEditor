import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import Button from './common/Button'
import { createTask } from '../modules/tasks'

const Label = styled.label`
  display: inline-block;
  margin: 0 5px;
`

const Form = styled.div`
  padding: 10px;
  position: relative;
`
const Input = styled.input`
  height: 20px;
  margin: 0 0 0 5px;
`

const Error = styled.div`
  position: absolute;
  color: red;
  font-family: sans-serif;
  top: 10px;
  left: 500px;
`

const Wrapper = styled.div`
  height: 30px;
  margin: 10px;
  line-height: 30px;
`
class AuthForm extends Component {
  state = {
    data: {},
    error: false
  }

  handleChange = event => {
    this.setState({
      data: { ...this.state.data, [event.target.name]: event.target.value }
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    const { name, password } = this.state.data
    if (!(name && password)) {
      this.setState({ error: 'Заполните обязательные поля' })
    } else if (name !== 'admin' || password !== '123') {
      this.setState({ error: 'Неверные данные (admin, 123)' })
    } else {
      this.setState({ error: false })
      localStorage.setItem('access', 'true')
    }
  }

  getForm = () => {
    return (
      <Form>
        <Label>
          Имя:
          <Input name="name" onChange={this.handleChange} />
        </Label>
        <Label>
          Пароль:
          <Input name="password" onChange={this.handleChange} />
        </Label>
        <Button type="submit" onClick={this.handleSubmit}>
          Вход
        </Button>

        {this.state.error && <Error>{this.state.error}</Error>}
      </Form>
    )
  }

  logOut = () => {
    localStorage.clear()
    this.forceUpdate()
    this.setState({data: {}})
  }

  getAdmin = () => {
    return (
      <React.Fragment>
        admin
        <Button onClick={this.logOut}>Выйти</Button>
      </React.Fragment>
    )
  }

  render() {
    const access = localStorage.getItem('access')
    console.log({access})
    return <Wrapper>{access ? this.getAdmin() : this.getForm()}</Wrapper>
  }
}

export default connect(
  state => ({}),
  { createTask }
)(AuthForm)
