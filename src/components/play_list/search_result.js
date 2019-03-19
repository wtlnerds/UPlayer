import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import PopoutVideo from './popout_video';
// import {Popout} from 'react-popout-component';

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

class SearchResult extends Component{

    constructor(props) {
        super(props);
        
        this.state = {
            showWindowPortal: false,
        };
        
        this.toggleWindowPortal = this.toggleWindowPortal.bind(this);
        this.closeWindowPortal = this.closeWindowPortal.bind(this);
      }
      
      toggleWindowPortal() {
        this.setState(state => ({
          ...state,
          showWindowPortal: !state.showWindowPortal,
        }));
      }

      componentDidMount() {
        window.addEventListener('beforeunload', () => {
          this.closeWindowPortal();
        });}

      closeWindowPortal() {
        this.setState({ showWindowPortal: false })
      }
    
    render(){
        const data = [1,1,1,1,1,1,1,1,1,1] // testing, need to delete later

        const {classes} = this.props;

        return(
        <div className={classes.root}>
            <Typography className={classes.header} component="h5" variant="h5">
            搜索“xxx”返回的结果
            </Typography>
                <div>
                    {/* Testing, need to delete this later*/}
                    {data.map(element => (
                        <Card className={classes.card} elevation={0} >
                                <div>
                                    <CardContent className={classes.content}>
                                        <CardMedia
                                        className={classes.cover}
                                        image="https://img.youtube.com/vi/ry3Tupx4BL4/maxresdefault.jpg"
                                        />
                                        <div className={classes.text}>
                                            <Typography variant="body1">
                                            【HD】以冬 - 我的一個道姑朋友 [歌詞字幕][遊戲《劍俠情緣網絡版3》同人主題曲][完整高清音質] Yi Dong - One Of My Taoist Nun Friends
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary">
                                                &nbsp;&nbsp;Uploadby: Mac Miller1111111111111111111111111111
                                            </Typography>
                                        </div>
                                        <Typography variant="subtitle2" className={classes.description}>
                                            Description: ヨルシカ - パレード 
                                            Yorushika - Parade

                                            作詞作曲、編曲(Words and Music,Arranged)：n-buna 
                                            Vocal：suis 

                                            Music Video Directed by 大鳥
                                            Camera : アフガンRAY

                                            3rd Album 「だから僕は音楽を辞めた」
                                            
                                            2019年4月10日(水)発売、予約受付中
                                            http://yorushika.com
                                        </Typography>

                                        <Button
                                        className={classes.watch} 
                                        variant="contained" 
                                        color="secondary"
                                        onClick={this.toggleWindowPortal}>
                                        Watch
                                        <Icon className={classes.watchicon}>ondemand_video</Icon>
                                        </Button> 

                                        {this.state.showWindowPortal && (
                                            <PopoutVideo>
                                                <div>
                                                </div>
                                            </PopoutVideo>
                                        )}

                                        <Button variant="contained" color="primary" className={classes.download}>
                                        download
                                        <Icon className={classes.downloadicon}>get_app</Icon>
                                        </Button>
                                    </CardContent>
                                </div>
                        </Card>
                    ))}
                </div>

          </div>
        )
    }
}

export default withStyles(styles)(SearchResult);