import React, { Component } from 'react';

import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import Moment from  'react-moment'
import {deleteEducation} from '../../action/ProfileAction'




class Education extends Component {
    onClickDelete(id){
        console.log(id)
   this.props.deleteEducation(id)
    }
  
    render() { 
        
        const education = this.props.education.map((edu) => (
          <tr key={edu._id}>
            <td>{edu.school}</td>
            <td>{edu.degree}</td>
            <td>
              <Moment  format="YYYY/MM/DD">{edu.from}</Moment> -
              {edu.to === null ? (
                "Now"
              ) : (
                <Moment   format="YYYY/MM/DD">{edu.to}</Moment>
              )}
              
            </td>
            <td>
              <button onClick={this.onClickDelete.bind(this,edu._id)} className="btn btn-danger">
                Delete
              </button>
            </td>
            <td>
              <button className="btn btn-secondary">Update</button>
            </td>
          </tr>
        ));
        return ( 
            <div>
                <h4 className="mb-4">Educational Credential</h4>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>School</th>
                            <th>Degree</th>
                            <th>Date</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        
                            {education}
                        
                    </tbody>
                </table>
            </div>
         );
    }
}

Education.propTypes = {
    deleteEducation:PropTypes.func.isRequired
}


 
export default connect(null,{deleteEducation})(Education);
