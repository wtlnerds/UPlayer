import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Fab from '@material-ui/core/Fab';

const styles = theme => ({

    root: {
        width: '100%',
        maxWidth: 360,
      },

    fab: {  
      backgroundColor: 'black',
      elevation:'0dp',
    },


  });

class PlayNavigator extends React.Component {
  state = {
    selectedIndex: 0,
  };

  handleListItemClick = (event, index) => {
    this.setState({ selectedIndex: index });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <List component="nav">
          <ListItem dense={true} alignItems="center">
            <ListItemText>我的音乐</ListItemText>
          </ListItem>
        </List>
        <List component="nav">
          <ListItem
            button
            selected={this.state.selectedIndex === 0}
            onClick={event => this.handleListItemClick(event, 0)}
          >
            <ListItemIcon>
              <Icon>library_music</Icon>
            </ListItemIcon>
            <ListItemText primary="试听列表" />
          </ListItem>
          <ListItem
            button
            selected={this.state.selectedIndex === 1}
            onClick={event => this.handleListItemClick(event, 1)}
          >
            <ListItemIcon>
                <Icon>signal_cellular_alt</Icon>
            </ListItemIcon>
            <ListItemText primary="时下流行" />
          </ListItem>
        </List>
        <Divider />
        <List component="nav">
          <ListItem dense={true} alignItems="center">
            <ListItemText>我的歌单</ListItemText>
          </ListItem>
        </List>
        <List component="nav">
          <ListItem
            button
            selected={this.state.selectedIndex === 2}
            onClick={event => this.handleListItemClick(event, 2)}
          >
            <ListItemIcon>
                <Fab color="primary" aria-label="Add" size="small" className={classes.fab}>
                    <Icon>add</Icon>
                </Fab>
            </ListItemIcon>
            <ListItemText primary="创建歌单" />
          </ListItem>
        </List>
      </div>
    );
  }
}

export default withStyles(styles)(PlayNavigator);