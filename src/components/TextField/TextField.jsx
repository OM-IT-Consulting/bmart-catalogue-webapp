import React from 'react';
import PropTypes from 'prop-types';

class TextField extends React.Component {


  render() {
    return (
      <div id="test"><span id="textfield" /><input type="text" name={this.props.textfieldname} onChange={this.props.handleChange} /></div>
    );
  }
}

TextField.propTypes = { textfieldname: PropTypes.string };

export default TextField;
