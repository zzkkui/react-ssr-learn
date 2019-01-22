import React from 'react';

class NotFound extends React.Component {

  componentWillMount() {
    const {staticContext} = this.props;
    staticContext && (staticContext.NOT_FOUND = true);
  }

  render() {
    return (
      <div>404</div>
    )
  }
    
};

export default NotFound;
