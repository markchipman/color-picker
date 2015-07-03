'use strict';

require('rc-color-picker/assets/index.css');
const React = require('react');
const ColorPicker = require('rc-color-picker');

React.render(
  <div style={{margin:20, textAlign: 'center'}}>
    <h1>拾色器</h1>
    <ColorPicker defaultColor={'#36c'} />
    <br/>
    <ColorPicker defaultColor={'#fcd'} align="left"/>
  </div>,
  document.getElementById('__react-content')
);
