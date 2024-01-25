import React from 'react';
import './index.css';

export class SitePage extends React.Component {
  render() {
    return <div className="site-page">{this.props.children}</div>;
  }
}
