import React, {Component} from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import { withStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
// mport Fab from '@material-ui/core/Fab'

const styles = {
    head:{
        '&:hover':{
            '& $root_icon_not_liked':{
                opacity:1,
            },
            '& $root_icon_liked':{
                opacity:1,
            },
        },
    },
    name_of_play_list:{
        backgroundColor: 'white',
        width: '100vw',
    },
    root: {
        width: '35vw',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    root_name: {
        width: '25vw',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    },
    root_icon_parent: {
        paddingLeft: '5vw',
        display: 'flex',
        alignContent:'flex-start',
        justifyContent:'center',
    },
    root_icon_not_liked: {
        opacity: 0,
        paddingLeft:'1vw',
    },
    root_icon_liked:{
        opacity: 0,
        paddingLeft:'1vw',
    },
    root_uploadby:{
        width:'15vw',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      },
    root_duration:{
        width:'7vw',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      },
  };

class PlayListContent extends Component {

    constructor(props) {
        super(props)        
        this.state = {
          tracks: props.tracks
        }
    }
    
    handleListItemClick = (event, track) => {
        this.setState({ selectedIndex: track.index })
        this.props.loadTrack(track)
    }
    
    handleLikeClick = (event, id) => {
        event.stopPropagation();
        const tmp = this.state.tracks;
        tmp[id].liked = !(tmp[id].liked)
        this.setState({tracks: tmp});
    } 

    componentDidUpdate(prevProps){
        if(this.props.tracks !== prevProps.tracks){
          this.setState({tracks: this.props.tracks})
        }
    }

    render(){
    
        const { classes } = this.props;

        if(!this.state.tracks) return (<div></div>) 
        const rows = this.state.tracks
        return(
              <Card elevation={0}>
                  <CardContent>
                      <div className={classes.name_of_play_list} position="fixed">
                          <h2>试听列表</h2>
                      </div>
                      <Table>
                          <TableHead>
                              <TableRow>
                                  <TableCell>歌曲</TableCell>
                                  <TableCell>上传者</TableCell>
                              </TableRow>
                          </TableHead>
                          <TableBody >
                              {rows.map(row => (
                                  <TableRow
                                      className={classes.head}
                                      hover={true}                              
                                      key={row.id}
                                      selected={this.state.selectedIndex === row.id}
                                      onClick={event => this.handleListItemClick(event, row)}
                                  >   
                                      <TableCell component="th" scope="row">
                                          <div className={classes.root}>
                                              <p className={classes.root_name}>{row.name.substr(0,row.name.length-4)}</p>
                                              <div className={classes.root_icon_parent}>
                                                  <Icon className={classes.root_icon_not_liked}>play_arrow_border</Icon>

                                                  {!row.liked &&
                                                  <Icon className={classes.root_icon_not_liked}
                                                      onClick={event => this.handleLikeClick(event, row.id)}
                                                  >favorite_border
                                                  </Icon>}

                                                  {row.liked && <Icon className={classes.root_icon_liked}
                                                      onClick={event => this.handleLikeClick(event, row.id)}
                                                  >favorite
                                                  </Icon>}
                                                  <Icon className={classes.root_icon_not_liked}>format_list_bulleted</Icon>
                                              </div>
                                          </div>
                                      </TableCell>
                                      <TableCell> 
                                          <p className={classes.root_uploadby}>{row.uploadBy}</p>
                                      </TableCell>
                                  </TableRow>
                              ))}
                          </TableBody>
                      </Table>
                  </CardContent>            
              </Card>
        )
    }
}

export default withStyles(styles)(PlayListContent);
