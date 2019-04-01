import React from 'react'
import styled from 'styled-components'

const TaskWrapper = styled.div`
  background: lightblue;
  padding: 10px;
  margin: 10px;
`

const Email = styled.div`
  margin: 10px 0;
  font-family: sans-serif;
  font-weight: 100;
`

const Text = styled.div`
  margin: 10px 0;
`

const Username = styled.div`
  font-weight: 600;
  margin: 10px 0;
`

const Checkbox = styled.label`
    float: right;
`

export default ({record}) => {
    const {email, username, text, status} = record
    return (
        <TaskWrapper>
            <Checkbox><input type='checkbox' checked={status} disabled={!localStorage.getItem('access')}/> Проверено </ Checkbox>
            <Username>{username}</Username>
            <Email>{email}</Email>
            <Text>{text}</Text>
        </TaskWrapper>
    )
}
