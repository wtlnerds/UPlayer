import React, {Component} from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import LoadingOverlay from 'react-loading-overlay';
import ScaleLoader from 'react-spinners/ScaleLoader';
import FSModule from '../../utils/file_system';
import { withStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';

function createData(name, uploadBy, duration, id) {  
  return { name, uploadBy, duration, id};
}

const styles = {
    root: {
        width: '35vw',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    root_name: {
        width: '25vw',
        paddingLeft: '3vw',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    },
    root_icon: {
        color: 'red',
        fontsize: 'small',
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

class MyFavorite extends Component {

    constructor(props) {
        super(props)
        this.state = {isLoading: props.loading}
        FSModule.loadTrackList().then((res) => {
            this.setState({tracks: res})
        })
    }

    state = {
        selectedIndex: 0,
      };
    
    handleListItemClick = (event, index, name) => {
        this.setState({ selectedIndex: index })
        this.props.loadTrack(createData(name, '米津玄师米津玄师米津玄师米津玄师米津玄师米津玄师米津玄师米津玄师', 1, index))
    }

    componentDidUpdate(prevProps){
        if(this.props.loading !== prevProps.loading){
            this.setState({isLoading: this.props.loading})
        }
    }

    render(){
    
        const { classes } = this.props;

        if(!this.state.tracks) return (<div></div>) 
        const rows = this.state.tracks.map((element, index) => {
            return createData(element, '米津玄师米津玄师米津玄师米津玄师米津玄师米津玄师米津玄师米津玄师', 1, index)
        })         
        return(
            <LoadingOverlay
                active={this.state.isLoading}
                spinner={<ScaleLoader sizeUnit={'px'} size={300} color={'#EFEFEF'} />}
            >
                <Card elevation={0}>
                    <CardContent>
                        <div className="name-of-play-list" position="fixed">
                            <h2>我的喜欢</h2>
                        </div>
                        <div className="information-of-play-list">
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="inherit">歌曲</TableCell>
                                        <TableCell>上传者</TableCell>
                                        <TableCell>时长</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody >
                                    {rows.map(row => (
                                        <TableRow
                                            className={classes.head}
                                            hover={true}                                
                                            key={row.id}
                                            selected={this.state.selectedIndex === row.id}
                                            onClick={event => this.handleListItemClick(event, row.id, row.name)}
                                        >   
                                            <TableCell component="th" scope="row">
                                                <div className={classes.root}>
                                                    <Icon className={classes.root_icon}>favorite</Icon>
                                                    <p className={classes.root_name}>{row.name.substr(0,row.name.length-4)}</p>
                                                </div>
                                            </TableCell>
                                            <TableCell> 
                                                <p className={classes.root_uploadby}>{row.uploadBy}</p>
                                            </TableCell>
                                            <TableCell> 
                                                <p className={classes.root_duration}>{row.duration}</p>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>

                            </Table>
                        </div>
                    </CardContent>            
                </Card>
            </LoadingOverlay>
        )
    }
}

export default withStyles(styles)(MyFavorite);