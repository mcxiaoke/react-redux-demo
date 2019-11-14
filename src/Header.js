import React, { Component } from "react";
import { connect } from "./connect";
import { ThemeContext } from "./Context";

class Header extends Component {
  static contextType = ThemeContext;

  render() {
    console.log("Context:", this.context);
    return <h1 style={{ color: this.props.themeColor }}>React.js 小书</h1>;
  }
}

const mapStateToProps = state => {
  return {
    themeColor: state.themeColor
  };
};
Header = connect(mapStateToProps)(Header);

export default Header;
