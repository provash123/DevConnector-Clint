import React, { Component } from 'react';
import {connect} from 'react-redux'
import { PropTypes } from 'prop-types';
import {getPost} from '../../action/PostAction'
import PostItem from '../Posts/PostItem'
import Spinner from './../../common/Spiner';
import { Link } from 'react-router-dom';
import PostComment from './PostComment';
import CommentFeed from './CommentFeed';

class Post extends Component {
    componentDidMount(){
        this.props.getPost(this.props.match.params.id)
    }
    
    render() { 
        const {post,loading} = this.props.post
          let postContent;

          if(post === null || loading || Object.keys(post).length === 0 ){
              postContent = <Spinner/>
          }
          else {
              postContent = (
                  <div>
                      <PostItem post = {post} showActions={false}  />
                      <PostComment postId= {post._id} />
                      <CommentFeed postId={post._id} comments = {post.comments} />
                  </div>
              )
          }
        return ( 
           <div className="post">
               <div className="container">
                   <div className="row">
                       <div className="col-md-12">
                           <Link to='/feed' className="btn btn-light mb-3">
                               Back To Feed
                           </Link>
                           {postContent}
                       </div>
                   </div>
               </div>
           </div>
         );
    }
}
Post.propTypes = {
    getPost:PropTypes.func.isRequired,
    post:PropTypes.object.isRequired
}
 const mapStateToProps = state =>({
     post:state.post
 })
export default connect(mapStateToProps ,{getPost}) (Post);