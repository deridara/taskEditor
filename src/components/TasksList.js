import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import Task from './Task'
import * as colors from '../colors'
import Filters from './Filters'

import {
  tasksSelector,
  totalTaskCountSelector,
  loadingSelector,
  getTasks,
  setFilterOptions,
  filterOptionsSelector
} from '../modules/tasks'

const Loading = styled.div`
  content: 'Loading...';
  width: 100%;
  text-align: center;
  margin: 50px;
`

const PaginationWrapper = styled.div`
  margin: 10px;
  float: right;
`

const Page = styled.div`
  display: inline-block;
  height: 30px;
  width: 30px;
  margin: 0 5px;
  line-height: 30px;
  text-align: center;
  border-radius: 3px;
  border: 1px solid ${colors.lightBlue};
  background: ${props => (props.active ? colors.lightBlue : 'white')};
  cursor: pointer;

  &:hover {
    background: ${colors.lightBlue};
  }
`

class TaskList extends Component {
  constructor(props) {
    super(props)
    this.state = this.props.filterOptions
  }

  componentDidMount = () => {
    this.props.getTasks({ ...this.state })
  }

  shouldComponentUpdate = () => {
    return this.props.loading
  }

  getPagination = totalTaskCount => {
    const pagesCount = Math.ceil(totalTaskCount / 3)
    const currentPage = this.state.page
    const pages = []
    for (let i = 1; i <= pagesCount; i++) {
      pages.push({ number: i, active: i === currentPage })
    }
    return (
      <PaginationWrapper>
        {pages.map(page => this.renderPageButton(page))}
      </PaginationWrapper>
    )
  }

  renderPageButton = ({ number, active }) => {
    return (
      <Page active={active} onClick={this.onPageClick(number)} key={number}>
        {number}
      </Page>
    )
  }

  onPageClick = page => () => {
    const { sortDirection, sortField } = this.state
    this.setState({ page })
    this.props.setFilterOptions({ page })
    this.props.getTasks({ sortDirection, page, sortField })
  }

  onFilterChange = newState => {
    this.setState(newState)
    this.props.setFilterOptions(newState)
  }

  render() {
    const { tasks, totalTaskCount } = this.props
    return (
      <React.Fragment>
        <Filters
          onFilterChange={this.onFilterChange}
          getTasks={this.props.getTasks}
          sortDirection={this.state.sortDirection}
          sortField={this.state.sortField}
          page={this.state.page}
        />
        {tasks.map(task => (
          <Task record={task} key={task.id} />
        ))}
        {this.getPagination(totalTaskCount)}
      </React.Fragment>
    )
  }
}

export default connect(
  state => ({
    tasks: tasksSelector(state),
    totalTaskCount: totalTaskCountSelector(state),
    loading: loadingSelector(state),
    filterOptions: filterOptionsSelector(state)
  }),
  {
    getTasks,
    setFilterOptions
  }
)(TaskList)
