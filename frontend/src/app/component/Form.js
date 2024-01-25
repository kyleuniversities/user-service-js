import React from 'react';

/**
 * Component for form input
 */
export class FormInput extends React.Component {
  render() {
    return (
      <div className="form-input">
        <b>
          <label for={this.props.name}>{this.props.label}</label>
        </b>
        <br />
        <input
          name={this.props.name}
          value={this.props.value}
          type={this.props.type}
          onChange={(e) => this.props.setValue(e.target.value)}
        />
        <br />
      </div>
    );
  }
}

/**
 * Component for submit button
 */
export class SubmitButton extends React.Component {
  render() {
    return (
      <button type="button" onClick={this.props.onClick}>
        Submit
      </button>
    );
  }
}
