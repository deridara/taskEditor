import React, { Component } from 'react';
import styled from 'styled-components'
import * as colors from '../../colors'

const Button = styled.div`
  display: inline-block;
  padding: 0 20px;
  height: 30px;
  color: white;
  background: ${colors.lightBlue};
  border-radius: 3px;
  box-sizing: border-box;
  text-align: center;
  line-height: 30px;
  cursor: pointer;
  margin: 0 10px;

  &:hover {
    background: ${colors.blue};
  }

  &:active {
    background: ${colors.darkBlue};
  }
`
export default Button

