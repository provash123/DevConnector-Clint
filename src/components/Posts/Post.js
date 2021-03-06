import React, { Component } from 'react';

import PostFrom from './PostFrom'
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import {getPosts} from './../../action/PostAction'
import Spinner from './../../common/Spiner';
import PostFeed from './PostFeed';
class Posts extends Component {
    componentDidMount(){
        this.props.getPosts()
    }
    
    render() { 
        const {posts,loading} = this.props.post
        let postContent;
        if(posts === null || loading){
            postContent = <Spinner/>
        }else{
            postContent = <PostFeed posts={posts} />
        }
        return ( 
           <div className="feed">
               <div className="container">
                   <div className="row">
                       <div className="col-md-12">
                           <PostFrom/>
                           {postContent}
                       </div>
                   </div>
               </div>
           </div>
         );
    }
}
Posts.propTypes = {
    getPosts:PropTypes.func.isRequired,
    post:PropTypes.object.isRequired
}
 const mapStateToProps = (state)=>({
     post:state.post
 })
 
export default connect(mapStateToProps,{getPosts})(Posts);
