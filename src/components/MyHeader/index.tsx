import React, {Component} from 'react';
import AppBar from "@material-ui/core/AppBar";
import InputBase from "@material-ui/core/InputBase";
import Toolbar from "@material-ui/core/Toolbar";
import classes from './index.scss';
import Menu from '@material-ui/icons/Menu';
import Search from "@material-ui/icons/Search";
import Home from "@material-ui/icons/Home";
import {goHome} from "../../routers/history";
import Typography from "@material-ui/core/Typography";
import {openMenu, store} from "../../store";
import {observer} from "mobx-react";


type Props = {};


export class HomeHeader extends Component<Props> {
    /**
     * lifecycle
     */

    render() {
        return <div>
            <AppBar position={'static'} color={"primary"}>
                <Toolbar>
                    <Menu onClick={openMenu}/>
                    <div className={classes["search-container"]}>
                        <InputBase defaultValue={store.searchWord} onChange={this.search} placeholder={'Search...'} classes={{
                            root: classes["search-root"],
                            input: classes["search-input"]
                        }}/>
                        <div className={classes["search-icon"]}>
                            <Search color={'primary'}/>
                        </div>
                    </div>


                    {/*<Button color={'primary'} variant={'contained'}>*/}
                    {/*</Button>*/}

                </Toolbar>
            </AppBar>
        </div>;
    }

    /**
     *properties
     */
    times;
    /**
     *method
     */
    search=(e)=>{
        let word=e.target.value.replace(/\s+/g,' ').replace(/^\s/g,'').replace(/\s$/g,'');
        clearTimeout(this.times);
        this.times=setTimeout(function () {
            store.searchWord=word;
        },300);
    };
}
@observer
export class DetailsHeader extends Component<Props> {
    /**
     * lifecycle
     */

    render() {
        return <div>
            <AppBar position={'static'} color={"primary"}>
                <Toolbar>
                    <Home onClick={goHome}/>
                    <Typography classes={{
                        root:classes.title
                    }}>
                        {store.title}
                    </Typography>


                    {/*<Button color={'primary'} variant={'contained'}>*/}
                    {/*</Button>*/}

                </Toolbar>
            </AppBar>
        </div>;
    }

    /**
     *properties
     */

    /**
     *method
     */
}
