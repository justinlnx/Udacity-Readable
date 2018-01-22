import React, { Component } from 'react';
import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as AllActions from '../actions';

class PostItem extends Component {
  state = {
    item: this.props
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
        <CardTitle title={item.title} subtitle={`${item.author} - ${this.converTimestamp(item.timestamp)}`} />
        <CardText>
          <div className='post-body'>
              {item.body}
          </div>
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
          <FlatButton
            icon={<i className='material-icons'>edit</i>}
          />
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
