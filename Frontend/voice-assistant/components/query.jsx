import React, { Component } from 'react';

class Query extends Component {
    render() { 
        return (
        <div className="form-group">
            <label for="data"></label>
            <input className = "form-control" type="text" id="data"></input>
            <button type = "submit" onClick = {this.props.getData} className = "btn btn-info btn-lg m-2">Send Request</button>
        </div>
        );
    }
}
 
export default Query;