import React, { Component } from 'react';
import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card';
import { List } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/FlatButton';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as AllActions from '../actions';
import { Route } from 'react-router-dom';
import CommentItem from './CommentItem';

class PostItem extends Component {
  state = {
    item: this.props,
    openModal: false
  }

  componentDidMount() {
    this.props.actions.GetCommentsByPost(this.props.id);
  }

  converTimestamp = (timestamp) => {
    return new Date(timestamp);
  }

  deleteItem = () => {
    this.props.actions.DeletePost(this.props.id);
  }

  updateVoteScore = (option) => {
    this.props.actions.UpdatePostVoteScore(this.props.id, option).then(() => {
      this.setState({
        item: this.props.posts.find(x => x.id === this.state.item.id)
      });
    });
  }

  render() {
    const {item} = this.state;
    return (
      <div>
        <Card>
          <CardTitle
            title={item.title}
            subtitle={`${item.author} - ${this.converTimestamp(item.timestamp)}`}
            actAsExpander={true}
            showExpandableButton={true}
          />
          <CardText expandable={true} >
            <div className='post-body'>
              {item.body}
            </div>
            <Divider/>
            <List>
              <Subheader>Comments</Subheader>
              {this.props.comments.length > 0 && this.props.comments.map((comment) => {
                if(comment.parentId === item.id) {
                  return <CommentItem key={comment.id} cid={comment.id} />
                }
                return null;
              })}
              <Divider inset={true}/>
            </List>
          </CardText>
          <CardActions>
            <FlatButton
              icon={<i className='material-icons'>thumb_up</i>}
              label={item.voteScore.toString()}
              onClick={this.updateVoteScore.bind(this, 'upVote')}
            />
            <FlatButton
              icon={<i className='material-icons'>thumb_down</i>}
              label={item.voteScore.toString()}
              onClick={this.updateVoteScore.bind(this, 'downVote')}
            />
            <Route render={({history}) => (
              <FlatButton
                icon={<i className='material-icons'>mode_comment</i>}
                label={item.commentCount.toString()}
                onClick={() => { history.push(`/create/${item.id}/comment`) }}
              />
            )} />
            <FlatButton
              icon={<i className='material-icons'>delete</i>}
              onClick={this.deleteItem}
            />
            <Route render={({history}) => (
              <FlatButton
                icon={<i className='material-icons'>edit</i>}
                onClick={() => { history.push(`/edit/${item.id}`) }}
              />
            )} />
          </CardActions>
        </Card>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    posts: state.posts.posts,
    comments: state.comments.comments
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(
      Object.assign(
        {},
        AllActions,
      ),
    dispatch
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostItem);
