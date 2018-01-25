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
    comments: []
  }

  componentDidMount() {
    this.props.actions.GetCommentsByPost(this.props.id).then(res => {
      if(res) {
        this.setState({comments: res});
      }
    });
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
            {this.state.comments.length !== 0 && this.state.comments.map((comment) => {
              return <CommentItem key={comment.id} item={comment} />
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
          <FlatButton
            icon={<i className="material-icons">mode_comment</i>}
            label={item.commentCount.toString()}
          />
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
    )
  }
}

function mapStateToProps (state) {
  return {
    posts: state.posts.posts
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
