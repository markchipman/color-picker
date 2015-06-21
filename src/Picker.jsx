'use strict';

let React = require('react');
// 色板
let Board = require('./Board');
let Preview = require('./Preview');
let Ribbon = require('./Ribbon');
let Alpha = require('./Alpha');
let Params = require('./Params');

let prefixClsFn = require('./utils/prefixClsFn');

class Picker extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      defaultColor: props.defaultColor,
      visible: props.visible,
      prefixCls: props.prefixCls,
      style: props.style
    };

    this.prefixClsFn = prefixClsFn.bind(this);

    let events = [
      'toggleClassName',
      'toggle',
      '_onChange',
      '_onRender',
      '_onHueChange',
      '_onHexChange',
      '_onAlphaChange',
      'handleFocus',
      'handlerBlur'
    ];
    // bind methods
    events.forEach(m => {
      this[m] = this[m].bind(this);
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (!prevState.visible) {
      // 如果从 false 切换过来则聚焦
      React.findDOMNode(this).focus();
    }
  }

  /**
   * 颜色选取发生改变的回调
   * @param {object} colorsObj 回调的返回值
   * @param {string} colorsObj.hex 颜色的16进制 eg: #FFFFFF
   * @param {object} colorsObj.rgb RGB对应的数值
   * @param {object} colorsObj.hsv HSV对应的数值
   * @param {object} colorsObj.hsl HSL对应的数值
   * @return {undefined}
   */
  _onChange(colorsObj) {
    this.setState({
      defaultColor: colorsObj.hex
    });

    if (typeof this.props.onChange === 'function') {
      this.props.onChange(colorsObj);
    }
  }

  _onRender(colorsObj) {
    this.setState({
      colorsObj
    });
  }

  _onHueChange(hue) {
    this.setState({hue});
  }

  _onHexChange(hex) {
    this.setState({
      defaultColor: hex
    });
  }

  _onAlphaChange(alpha) {
    this.setState({
      alpha
    });
  }

  handleFocus() {
    if (this._blurTimer) {
      clearTimeout(this._blurTimer);
      this._blurTimer = null;
    } else {
      this.props.onFocus();
    }
  }

  handlerBlur() {
    if (this._blurTimer) {
      clearTimeout(this._blurTimer);
    }
    this._blurTimer = setTimeout(()=> {
      this.props.onBlur();
    }, 100);
  }
  /**
   * 切换显示状态
   * @param  {boolean} val 是否战士
   * @return {undefined}
   */
  toggle(callback) {
    this.setState({
      visible: !this.state.visible
    }, callback);
  }

  hide(callback) {
    this.setState({
      visible: false
    }, callback);
  }

  show(callback) {
    this.setState({
      visible: true
    }, callback);
  }

 toggleClassName() {
    let name = this.state.visible ? 'open' : 'close';
    return this.prefixClsFn(name);
  }

  render() {
    return (
      <div
        className={this.props.prefixCls + ' ' + this.toggleClassName()}
        style={this.state.style}
        onFocus={this.handleFocus}
        onBlur={this.handlerBlur}
        tabIndex='0'
      >
        <div className={this.prefixClsFn('panel')}>
          <Board
            alpha={this.state.alpha}
            hue={this.state.hue}
            defaultColor={this.state.defaultColor}
            onChange={this._onChange}
            onRender={this._onRender}
          />
          <div className={this.prefixClsFn('wrap')}>
            <div className={this.prefixClsFn('wrap-ribbon')}>
              <Ribbon
                defaultColor={this.state.defaultColor}
                onHexChange={this._onHueChange}
              />
            </div>
            <div className={this.prefixClsFn('wrap-alpha')}>
              <Alpha
                alpha={this.state.alpha}
                defaultColor={this.state.defaultColor}
                onAlphaChange={this._onAlphaChange}
              />
            </div>
            <div className={this.prefixClsFn('wrap-preview')}>
              <Preview
                alpha={this.state.alpha}
                defaultColor={this.state.defaultColor}
              />
            </div>
          </div>
          <div className={this.prefixClsFn('wrap')} style={{height: 40, marginTop: 6}}>
            <Params
              defaultColor={this.state.defaultColor}
              alpha={this.state.alpha}
              onAlphaChange={this._onAlphaChange}
              onHexChange={this._onHexChange}
            />
          </div>
        </div>
      </div>
    );
  }
}

Picker.propTypes = {
  visible: React.PropTypes.bool,
  prefixCls: React.PropTypes.string,
  defaultColor: React.PropTypes.string,
  style: React.PropTypes.object,
  onChange: React.PropTypes.func,
  onFocus: React.PropTypes.func,
  onBlur: React.PropTypes.func
};

Picker.defaultProps = {
  visible: true,
  prefixCls: 'rc-colorpicker',
  defaultColor: '#ff0000',
  style: {},
  onChange() {},
  onFocus() {},
  onBlur() {}
};

module.exports = Picker;
