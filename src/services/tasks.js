import request from 'request'

const BASE_URL = 'https://uxcandy.com/~shapoval/test-task-backend'

export const getTasks = (
  { sortDirection, page, sortField },
  name = 'admin'
) => {
  const qs = `${sortDirection ? `&sort_direction=${sortDirection}` : ''}${
    page ? `&page=${page}` : ''
  }${sortField ? `&sort_field=${sortField}` : ''}`

  return fetch(`${BASE_URL}/?developer=${name}${qs}`)
    .then(res => res.json())
    .catch(err => err)
}

export const createTask = body => {
  console.log('SERVICE', body)
  return fetch(`${BASE_URL}/create`, {
    method: 'POST',
    body: JSON.stringify(body)
  }).then(response => {
    console.log(response.json())
    return response.json()
  })
}
