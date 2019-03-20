import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';

import PrimarySearchAppBar from './primary_appsearch_bar';
import FSModule from '../../utils/file_system.js';
const styles = ({
    root: {
        width: '83.34vw',
        height: '90vh',
        marginBottom: '10vh',
        marginTop: 40,
    },
    header:{
        paddingLeft: '1.5vw',
    },
    card: {
        display: 'flex',
        height: '10vh', 
    },
    content: {
        display: 'flex',
        width: '100vw',
        flexDirection: 'row',
    },
    cover: {
        width: 100,
        objectFit: 'cover',
        height:60,
    },
    text: {
        marginTop: '1vh',
        paddingLeft: '1vw',
        width: '20vw',
        display: 'flex',
        flexDirection: 'column',
        wordWrap: 'break-word',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    },
    description: {
        paddingLeft:'2vw',
        width: '20vw',
        display: 'block',
        wordWrap: 'break-word',
        whiteSpace: 'normal',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    },
    watch: {
        marginLeft:'3vw',
        width: 130,
        marginTop:'1vh',
        height: '5vh',
    },
    download: {
        marginLeft:'3vw',
        width: 150,
        height: '5vh',
        marginTop:'1vh',
    },
    watchicon: {
        marginLeft:'0.5vw',
    },

    downloadicon: {
        marginLeft: '0.5vw',
    },

  });

class Search extends Component{

    constructor(props) {
        super(props);
        
        this.onDataReceived = this.onDataReceived.bind(this)
        this.state = {
          showWindowPortal: false,
          data: []
        };
      }
    
      onDataReceived(data) {
        this.setState({data: data})
      }

      download(obj) {
        FSModule.download(obj)
      }
      
      render(){
        const data = this.state.data
        const {classes} = this.props;

        return(
        <div>
        <div className="primary-appsearch-bar">
          <PrimarySearchAppBar onDataReceived={this.onDataReceived}></PrimarySearchAppBar>
        </div>
        <div className={classes.root}>
            <Typography className={classes.header} component="h5" variant="h5">
            搜索结果
            </Typography>
                <div>
                    {data.map((d, index) => (
                        <Card key={index} className={classes.card} elevation={0} >
                                <div>
                                    <CardContent className={classes.content}>
                                        <CardMedia
                                        className={classes.cover}
                                        image={d.thumbnails.high.url}
                                        />
                                        <div className={classes.text}>
                                            <Typography variant="body1">
                                              {d.title}
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary">
                                                Uploadby: {d.channelTitle}
                                            </Typography>
                                        </div>
                                        <Typography variant="subtitle2" className={classes.description}>
                                          {d.description}
                                        </Typography>

                                        <Button
                                        className={classes.watch} 
                                        variant="contained" 
                                        color="secondary">
                                        Watch
                                        <Icon className={classes.watchicon}>ondemand_video</Icon>
                                        </Button> 

                                        <Button 
                                          variant="contained" 
                                          color="primary"
                                          className={classes.download}
                                          onClick={() => this.download({url: d.link, name: d.title})}
                                        >
                                          download
                                          <Icon className={classes.downloadicon}>get_app</Icon>
                                        </Button>
                                    </CardContent>
                                </div>
                        </Card>
                    ))}
                </div>
          </div>
      </div>)
    }
}

export default withStyles(styles)(Search);
