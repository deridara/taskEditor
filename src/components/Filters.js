import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import SubmitButton from './common/Button'
import * as colors from '../colors'

const Filter = styled.div`
  margin: 10px;
`

const DirectionButton = styled.div`
  display: inline-block;
  height: 30px;
  width: 30px;
  border: 1px solid ${colors.lightBlue};
  border-radius: 3px;
  font-weight: 600;
  color: ${props => (props.active ? 'white' : colors.darkBlue)};
  background: ${props => (props.active ? colors.lightBlue : 'white')};
  cursor: pointer;
  margin: 0 5px;
  line-height: 30px;
  text-align: center;

  &:hover {
    background: ${colors.lightBlue};
    color: white;
  }
`

const StyledForm = styled.form`
  display: inline-block;
  line-height: 30px;
  margin: 10px;
`

class Filters extends Component {
  state = {
    sortField: ''
  }
  getSortDirectionButtons = () => {
    return (
      <React.Fragment>
        <DirectionButton
          onClick={this.onDirectionButtonClick('asc')}
          active={this.props.sortDirection === 'asc'}
        >
          △
        </DirectionButton>
        <DirectionButton
          onClick={this.onDirectionButtonClick('desc')}
          active={this.props.sortDirection === 'desc'}
        >
          ▽
        </DirectionButton>
      </React.Fragment>
    )
  }

  onDirectionButtonClick = sortDirection => () => {
    this.props.onFilterChange({ sortDirection })
    this.props.getTasks({
      sortDirection,
      page: this.props.page,
      sortField: this.props.sortField
    })
  }

  getSortFieldSelector = () => {
    return (
      <StyledForm>
        Сортировать по{' '}
        <select name="sort" onChange={this.onSortFormChange}>
          <option value="id">id</option>
          <option value="username">username</option>
          <option value="email">email</option>
          <option value="status">status</option>
        </select>
        <SubmitButton onClick={this.handleSortFormSubmit}>
          Сортировать
        </SubmitButton>
      </StyledForm>
    )
  }

  onSortFormChange = e => {
    const sortField = e.target.value
    this.setState({ sortField })
    this.props.onFilterChange({ sortField })
  }

  handleSortFormSubmit = () => {
    const { getTasks, onFilterChange, page, sortDirection } = this.props
    const { sortField } = this.state
    onFilterChange({ sortField })
    getTasks({ sortDirection, page, sortField })
  }

  render() {
    return (
      <Filter>
        {this.getSortDirectionButtons()}
        {this.getSortFieldSelector()}
      </Filter>
    )
  }
}

export default Filters
