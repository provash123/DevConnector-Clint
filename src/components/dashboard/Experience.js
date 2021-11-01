import React, { Component } from 'react';

import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import Moment from  'react-moment'
import {deleteExperience} from '../../action/ProfileAction'




class Experience extends Component {
    onClickDelete(id){
        console.log(id)
   this.props.deleteExperience(id)
    }
  
    render() { 
        
        const experience = this.props.experience.map((exp) => (
          <tr key={exp._id}>
            <td>{exp.company}</td>
            <td>{exp.title}</td>
            <td>
              <Moment  format="YYYY/MM/DD">{exp.from}</Moment> -
              {exp.to === null ? (
                "Now"
              ) : (
                <Moment   format="YYYY/MM/DD">{exp.to}</Moment>
              )}
              
            </td>
            <td>
              <button onClick={this.onClickDelete.bind(this,exp._id)} className="btn btn-danger">
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
                <h4 className="mb-4">Experience Credential</h4>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Company</th>
                            <th>Title</th>
                            <th>Date</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        
                            {experience}
                        
                    </tbody>
                </table>
            </div>
         );
    }
}

Experience.propTypes = {
    deleteExperience:PropTypes.func.isRequired
}


 
export default connect(null,{deleteExperience})(Experience);
