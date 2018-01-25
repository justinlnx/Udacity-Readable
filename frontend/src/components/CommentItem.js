import React, { Component } from 'react';
import { ListItem } from 'material-ui/List';
import FlatButton from 'material-ui/FlatButton';

class CommentItem extends Component {

  updateVoteScore = (option) => {
    console.log(option);
  }

  deleteItem = () => {
    console.log('delete comment');
  }

  render() {
    let {item} = this.props;
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
          </div>
        }
        secondaryTextLines={2}
      />
    );
  }
}

export default CommentItem;
