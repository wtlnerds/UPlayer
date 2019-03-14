import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';

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
    },
    text: {
        paddingLeft: '3vw',
        display: 'flex',
        flexDirection: 'column',
    }

  });

class SearchResult extends Component{

    render(){

        const { classes } = this.props;

        return(
        <div className={classes.root}>
            <Typography className={classes.header} component="h5" variant="h5">
            搜索“xxx”返回的结果
            </Typography>
            <Card className={classes.card} elevation={0} >
                <div>
                    <CardContent className={classes.content}>
                        <CardMedia
                        className={classes.cover}
                        image="https://img.youtube.com/vi/ry3Tupx4BL4/maxresdefault.jpg"
                        />
                        <div className={classes.text}>
                            <Typography component="h5" variant="h5">
                            Live From Space
                            </Typography>
                            <Typography variant="subtitle1" color="textSecondary">
                            Mac Miller
                            </Typography>
                        </div>
                    </CardContent>
                </div>
            </Card>
            <Card className={classes.card} elevation={0} >
                <div>
                    <CardContent className={classes.content}>
                        <CardMedia
                        className={classes.cover}
                        image="https://img.youtube.com/vi/ry3Tupx4BL4/maxresdefault.jpg"
                        />
                        <div className={classes.text}>
                            <Typography component="h5" variant="h5">
                            Live From Space
                            </Typography>
                            <Typography variant="subtitle1" color="textSecondary">
                            Mac Miller
                            </Typography>
                        </div>
                    </CardContent>
                </div>
            </Card>
            <Card className={classes.card} elevation={0} >
                <div>
                    <CardContent className={classes.content}>
                        <CardMedia
                        className={classes.cover}
                        image="https://img.youtube.com/vi/ry3Tupx4BL4/maxresdefault.jpg"
                        />
                        <div className={classes.text}>
                            <Typography component="h5" variant="h5">
                            Live From Space
                            </Typography>
                            <Typography variant="subtitle1" color="textSecondary">
                            Mac Miller
                            </Typography>
                        </div>
                    </CardContent>
                </div>
            </Card>
            <Card className={classes.card} elevation={0} >
                <div>
                    <CardContent className={classes.content}>
                        <CardMedia
                        className={classes.cover}
                        image="https://img.youtube.com/vi/ry3Tupx4BL4/maxresdefault.jpg"
                        />
                        <div className={classes.text}>
                            <Typography component="h5" variant="h5">
                            Live From Space
                            </Typography>
                            <Typography variant="subtitle1" color="textSecondary">
                            Mac Miller
                            </Typography>
                        </div>
                    </CardContent>
                </div>
            </Card>
            <Card className={classes.card} elevation={0} >
                <div>
                    <CardContent className={classes.content}>
                        <CardMedia
                        className={classes.cover}
                        image="https://img.youtube.com/vi/ry3Tupx4BL4/maxresdefault.jpg"
                        />
                        <div className={classes.text}>
                            <Typography component="h5" variant="h5">
                            Live From Space
                            </Typography>
                            <Typography variant="subtitle1" color="textSecondary">
                            Mac Miller
                            </Typography>
                        </div>
                    </CardContent>
                </div>
            </Card>
            <Card className={classes.card} elevation={0} >
                <div>
                    <CardContent className={classes.content}>
                        <CardMedia
                        className={classes.cover}
                        image="https://img.youtube.com/vi/ry3Tupx4BL4/maxresdefault.jpg"
                        />
                        <div className={classes.text}>
                            <Typography component="h5" variant="h5">
                            Live From Space
                            </Typography>
                            <Typography variant="subtitle1" color="textSecondary">
                            Mac Miller
                            </Typography>
                        </div>
                    </CardContent>
                </div>
            </Card>
            <Card className={classes.card} elevation={0} >
                <div>
                    <CardContent className={classes.content}>
                        <CardMedia
                        className={classes.cover}
                        image="https://img.youtube.com/vi/ry3Tupx4BL4/maxresdefault.jpg"
                        />
                        <div className={classes.text}>
                            <Typography component="h5" variant="h5">
                            Live From Space
                            </Typography>
                            <Typography variant="subtitle1" color="textSecondary">
                            Mac Miller
                            </Typography>
                        </div>
                    </CardContent>
                </div>
            </Card>
            <Card className={classes.card} elevation={0} >
                <div>
                    <CardContent className={classes.content}>
                        <CardMedia
                        className={classes.cover}
                        image="https://img.youtube.com/vi/ry3Tupx4BL4/maxresdefault.jpg"
                        />
                        <div className={classes.text}>
                            <Typography component="h5" variant="h5">
                            Live From Space
                            </Typography>
                            <Typography variant="subtitle1" color="textSecondary">
                            Mac Miller
                            </Typography>
                        </div>
                    </CardContent>
                </div>
            </Card>
            <Card className={classes.card} elevation={0} >
                <div>
                    <CardContent className={classes.content}>
                        <CardMedia
                        className={classes.cover}
                        image="https://img.youtube.com/vi/ry3Tupx4BL4/maxresdefault.jpg"
                        />
                        <div className={classes.text}>
                            <Typography component="h5" variant="h5">
                            Live From Space
                            </Typography>
                            <Typography variant="subtitle1" color="textSecondary">
                            Mac Miller
                            </Typography>
                        </div>
                    </CardContent>
                </div>
            </Card>
            <Card className={classes.card} elevation={0} >
                <div>
                    <CardContent className={classes.content}>
                        <CardMedia
                        className={classes.cover}
                        image="https://img.youtube.com/vi/ry3Tupx4BL4/maxresdefault.jpg"
                        />
                        <div className={classes.text}>
                            <Typography component="h5" variant="h5">
                            Live From Space
                            </Typography>
                            <Typography variant="subtitle1" color="textSecondary">
                            Mac Miller
                            </Typography>
                        </div>
                    </CardContent>
                </div>
            </Card>
          </div>
        )
    }
}

SearchResult.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
  };

export default withStyles(styles)(SearchResult);