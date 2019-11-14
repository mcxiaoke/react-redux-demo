import React, { Component } from "react";
import { ThemeContext } from "./Context";

export class Provider extends Component {
  render() {
    const store = { store: this.props.store };
    return (
      // importe use value not store
      <ThemeContext.Provider value={store}>
        <div>{this.props.children}</div>
      </ThemeContext.Provider>
    );
  }
}

export const connect = (
  mapStateToProps,
  mapDispatchToProps
) => WrappedComponent => {
  class Connect extends Component {
    static contextType = ThemeContext;

    constructor(props, context) {
      super(props, context);
      console.log("constructor Context:", context);
      this.state = {
        allProps: {}
      };
    }

    componentDidMount() {
    //   console.log("Connect:", this.context);
      const { store } = this.context;
      this._updateProps();
      store.subscribe(() => this._updateProps());
    }

    _updateProps() {
      const { store } = this.context;
      let stateProps = mapStateToProps
        ? mapStateToProps(store.getState(), this.props)
        : {}; // 防止 mapStateToProps 没有传入
      let dispatchProps = mapDispatchToProps
        ? mapDispatchToProps(store.dispatch, this.props)
        : {}; // 防止 mapDispatchToProps 没有传入
      this.setState({
        allProps: {
          ...stateProps,
          ...dispatchProps,
          ...this.props
        }
      });
    }

    render() {
      return <WrappedComponent {...this.state.allProps} />;
    }
  }

  return Connect;
};
