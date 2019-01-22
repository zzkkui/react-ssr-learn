import React from 'react'

export default (DecoratedComponent, styles) => {
  return class withStyle extends React.Component {

    componentWillMount() {
      if (this.props.staticContext) {
        this.props.staticContext.css.push(styles._getCss())
      }
    }

    render() {
      return <DecoratedComponent {...this.props} />;
    }
  }
}