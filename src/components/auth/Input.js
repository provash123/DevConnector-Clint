import React, { Component } from "react";

class Input extends Component {
  state = {};
  render() {
    const { type, name,placeholder,value,onChange,className,errors } = this.props;
    return (
      <div className="container">
        <div className = "form-group">
          <input
            type={type}
            className={className}
            placeholder={placeholder}
            name={name}
            value={value}
            onChange={onChange}
        />
    
        {errors&& <div className="invalid-feedback">{errors}</div>}
                  
        </div>

        
      </div>
    );
  }
}

export default Input;

