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

function createData(name, duration, uploadBy, uploadTime, views, id) {  
  return { name, duration, uploadBy, uploadTime, views, id };
}

export default class PlayListContent extends Component {
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
        this.props.loadTrack(name)
    }

    componentDidUpdate(prevProps){
        if(this.props.loading !== prevProps.loading){
            this.setState({isLoading: this.props.loading})
        }
    }

    render(){

        if(!this.state.tracks) return (<div></div>) 
        const rows = this.state.tracks.map((element, index) => {
            return createData(element, 1, 1, 1, 1, index)
        })         
        return(
            <LoadingOverlay
                active={this.state.isLoading}
                spinner={<ScaleLoader sizeUnit={'px'} size={300} color={'#EFEFEF'} />}
            >
                <Card elevation={0}>
                    <CardContent>
                        <div className="name-of-play-list" position="fixed">
                            <h2>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;试听列表</h2>
                        </div>
                        <div className="information-of-play-list">
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>歌曲</TableCell>
                                        <TableCell align="center">时长</TableCell>
                                        <TableCell align="center">上传者</TableCell>
                                        <TableCell align="center">上传时间</TableCell>
                                        <TableCell align="center">观看次数</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody >
                                    {rows.map(row => (
                                        <TableRow
                                            hover={true}
                                            key={row.id}
                                            selected={this.state.selectedIndex === row.id}
                                            onClick={event => this.handleListItemClick(event, row.id, row.name)}
                                        >
                                            <TableCell component="th" scope="row">
                                                {row.name}
                                            </TableCell>
                                            <TableCell align="center"> 
                                                {row.duration}
                                            </TableCell>
                                            <TableCell align="center"> 
                                                {row.uploadBy}
                                            </TableCell>
                                            <TableCell align="center"> 
                                                {row.uploadTime}
                                            </TableCell>
                                            <TableCell align="center"> 
                                                {row.views}
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