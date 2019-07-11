import React, {Component} from 'react';
import List from "@material-ui/core/List";
import {data} from "../../store";
import classes from './index.scss';
import {Link} from "react-router-dom";
import {HomeHeader} from "../../components/MyHeader";
import ListItem from '@material-ui/core/ListItem/ListItem';
import ListItemText from "@material-ui/core/ListItemText";

type Props = {};

class Home extends Component<Props> {
    /**
     * lifecycle
     */
    mounted = false;

    constructor(props) {
        super(props);
        if (wbp.dev) {
            console.log(this);
        }
    }

    componentDidMount() {
        this.mounted = true;
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    render() {
        const {chinese, japanese} = data;
        return <div className={classes.container}>
            <HomeHeader/>
            <div className={classes["list-root"]}>
                <List>
                    {
                        chinese.map((item, index) => {
                            let id = index + 1;
                            return <Link to={`/details/${id}`} key={item}>
                                <ListItem classes={{
                                    root: classes["item-root"]
                                }}>
                                    <ListItemText classes={{
                                        primary: classes["item-primary"]
                                    }} primary={`${id}.${item}`} secondary={japanese[index]}/>
                                </ListItem>
                            </Link>
                        })
                    }
                </List>
            </div>
        </div>
    }

    /**
     *properties
     */

    /**
     *method
     */

}

export default Home;
