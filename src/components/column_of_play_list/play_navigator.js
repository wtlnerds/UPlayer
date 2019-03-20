import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

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
  constructor(props){
    super(props)

    this.handleNavigation = this.props.handleNavigation

    this.state = {
      selectedIndex: 0,
    };
    
  }

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
            onClick={() => this.handleNavigation(0)}
          >
            <ListItemIcon>
              <Icon>library_music</Icon>
            </ListItemIcon>
            <ListItemText primary="试听列表" />
          </ListItem>
          <ListItem
            button
            onClick={() => this.handleNavigation(1)}
          >
            <ListItemIcon>
              <Icon>favorite</Icon>
            </ListItemIcon>
            <ListItemText primary="我的最爱" />
          </ListItem>
          <ListItem
            button
            onClick={() => this.handleNavigation(2)}
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
          >
            <ListItemIcon>
                <Icon>playlist_add</Icon>
            </ListItemIcon>
            <ListItemText secondary="创建歌单" />
          </ListItem>
        </List>
      </div>
    );
  }
}

export default withStyles(styles)(PlayNavigator);
