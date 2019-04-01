import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { createTask } from '../modules/tasks'
import SubmitButton from './common/Button'

const emailRegEx = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/

const Fieldset = styled.fieldset`
  padding: 0 25px 15px;
  margin: 0 10px;
  position: relative;
`

const Legend = styled.legend`
  margin: 0 0 15px;
  font-size: 1.5em;
  font-weight: 400;
`

const Label = styled.label`
  display: block;
  margin: 0 0 5px 0;
`

const LabelText = styled.div`
  display: inline-block;
  margin: 0 0 10px;
  width: 60px;
`

const Input = styled.input`
  margin: 0 0 15px;
  width: 200px;
  height: 20px;
  font-size: 1em;
  padding: 0 10px;
`

const Error = styled.div`
  position: absolute;
  color: red;
  font-family: sans-serif;
  top: 45px;
  left: 350px;
`

class TaskForm extends Component {
  state = {
    data: { username: '', email: '', text: '' },
    error: false
  }

  handleSubmit = e => {
    e.preventDefault()
    const { username, email, text } = this.state.data
    if (!(username && email && text)) {
      this.setState({ error: 'Заполните обязательные поля' })
    } else if (!email.match(emailRegEx)) {
      this.setState({ error: 'Введите валидный адрес' })
    } else {
      this.setState({ error: false })
      this.onSubmit({ username, email, text })
    }
  }

  handleChange = event => {
    this.setState({
      data: { ...this.state.data, [event.target.name]: event.target.value }
    })
  }

  onSubmit = data => {
    this.props.onSubmit(data)
  }

  render() {
    return (
      <form>
        <Fieldset>
          <Legend>Добавить новую задачу</Legend>
          <Label name="username">
            <LabelText>Автор:</LabelText>
            <Input
              name="username"
              type="text"
              placeholder={this.state.username}
              onChange={this.handleChange}
            />
          </Label>

          <Label name="email">
            <LabelText>Email:</LabelText>
            <Input
              name="email"
              type="email"
              placeholder={this.state.email}
              onChange={this.handleChange}
            />
          </Label>

          <Label name="text">
            <LabelText>Текст:</LabelText>
            <Input
              name="text"
              type="text"
              placeholder={this.state.text}
              onChange={this.handleChange}
            />
          </Label>
          {this.state.error && <Error>{this.state.error}</Error>}
          <SubmitButton type="submit" onClick={this.handleSubmit}>
            Добавить
          </SubmitButton>
        </Fieldset>
      </form>
    )
  }
}

export default connect(
  null,
  { createTask }
)(TaskForm)
