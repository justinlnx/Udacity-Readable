import React from 'react';
import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

const PostItem = function(props) {
  const converTimestamp = (timestamp) => {
    return new Date(timestamp);
  }

  return (
    <Card>
      <CardTitle title={props.title} subtitle={`${props.author} - ${converTimestamp(props.timestamp)}`} />
      <CardText>
        <div className='post-body'>
            {props.body}
        </div>
      </CardText>
      <CardActions>
        <FlatButton
          icon={<i className='material-icons'>favorite</i>}
          label={props.voteScore.toString()}
        />
        <FlatButton
          icon={<i className="material-icons">mode_comment</i>}
          label={props.commentCount.toString()}
        />
        <FlatButton
          icon={<i className='material-icons'>delete</i>}
        />
        <FlatButton
          icon={<i className='material-icons'>edit</i>}
        />
      </CardActions>
    </Card>
  )
}

export default PostItem;
