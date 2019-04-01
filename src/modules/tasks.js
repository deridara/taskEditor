import { all, put, call, takeEvery } from 'redux-saga/effects'
import { createSelector } from 'reselect'

import { name as appName } from '../../package.json'
import * as service from '../services/tasks'

const namespace = 'tasks'

// constants

const GET_TASKS_REQUEST = `${appName}/${namespace}/GET_TASKS_REQUEST`
const GET_TASKS_SUCCESS = `${appName}/${namespace}/GET_TASKS_SUCCESS`
const GET_TASKS_ERROR = `${appName}/${namespace}/GET_TASKS_ERROR`

const CREATE_TASK_REQUEST = `${appName}/${namespace}/CREATE_TASK_REQUEST`
const CREATE_TASK_SUCCESS = `${appName}/${namespace}/CREATE_TASK_SUCCESS`
const CREATE_TASK_ERROR = `${appName}/${namespace}/CREATE_TASK_ERROR`

const SET_FILTER_OPTIONS = `${appName}/${namespace}/SET_FILTER_OPTIONS`

// AC

export const getTasks = options => ({
  type: GET_TASKS_REQUEST,
  payload: options
})

export const setFilterOptions = options => ({
  type: SET_FILTER_OPTIONS,
  payload: options
})

export const createTask = body => ({
  type: CREATE_TASK_REQUEST,
  payload: body
})

// reducer

const initialState = {
  tasks: [],
  totalTaskCount: 0,
  filterOptions: {
    page: 1,
    sortDirection: 'asc',
    sortField: ''
  },
  loading: false
}

export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case GET_TASKS_REQUEST:
      return { ...state, loading: true }

    case GET_TASKS_SUCCESS:
      return {
        ...state,
        tasks: [...payload.tasks],
        totalTaskCount: +payload.total_task_count,
        loading: false
      }

    case GET_TASKS_ERROR:
      return { ...state, loading: false }

    case SET_FILTER_OPTIONS:
      return { ...state, filterOptions: { ...state.filterOptions, ...payload } }

    case CREATE_TASK_REQUEST:
      return { ...state, loading: true }

    case CREATE_TASK_SUCCESS:
      return { ...state, loading: false }

    case CREATE_TASK_ERROR:
      return { ...state, loading: false }

    default:
      return state
  }
}

//reselectors
export const stateSelector = state => state[namespace]

export const tasksSelector = createSelector(
  stateSelector,
  state => state.tasks
)

export const totalTaskCountSelector = createSelector(
  stateSelector,
  state => state.totalTaskCount
)

export const loadingSelector = createSelector(
  stateSelector,
  state => state.loading
)

export const filterOptionsSelector = createSelector(
  stateSelector,
  state => state.filterOptions
)

// sagas

export function* getTasksSaga({ payload }) {
  try {
    const data = yield call(service.getTasks, payload)
    yield put({
      type: GET_TASKS_SUCCESS,
      payload: { ...data.message }
    })
  } catch (error) {
    put({
      type: GET_TASKS_ERROR,
      error
    })
  }
}

export function* createTaskSaga({ payload }) {
  try {
    const data = yield call(service.createTask, payload)
    yield put({
      type: CREATE_TASK_SUCCESS,
      payload: { ...data.message }
    })
  } catch (error) {
    put({
      type: CREATE_TASK_ERROR,
      error
    })
  }
}

export const saga = function*() {
  yield all([
    takeEvery(GET_TASKS_REQUEST, getTasksSaga),
    takeEvery(CREATE_TASK_REQUEST, createTaskSaga)
  ])
}
