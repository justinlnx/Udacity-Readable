import React, { Component } from 'react';
import { ListItem } from 'material-ui/List';
import FlatButton from 'material-ui/FlatButton';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as AllActions from '../actions';
import { Route } from 'react-router-dom';

class CommentItem extends Component {
  state = {
    item: this.props.comments.find(x => x.id === this.props.cid)
  }

  updateVoteScore = (option) => {
    this.props.actions.UpdateCommentVoteScore(this.props.cid, option).then(() => {
      this.setState({
        item: this.props.comments.find(x => x.id === this.props.cid)
      });
    });
  }

  deleteItem = () => {
    this.props.actions.DeleteComment(this.props.cid);
  }

  render() {
    let {item} = this.state;
    return (
      <ListItem
        primaryText={`${item.author} - ${new Date(item.timestamp)}`}
        secondaryText={
          <div>
            <span>{item.body}</span>
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
              icon={<i className='material-icons'>delete</i>}
              onClick={this.deleteItem}
            />
            <Route render={({history}) => (
              <FlatButton
                icon={<i className='material-icons'>edit</i>}
                onClick={() => { history.push(`/comment/${item.id}`) }}
              />
            )} />
          </div>
        }
        secondaryTextLines={2}
      />
    );
  }
}

function mapStateToProps (state) {
  return {
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

export default connect(mapStateToProps, mapDispatchToProps)(CommentItem);
