import React, {Component} from 'react';
import List from "@material-ui/core/List";
import {closeDialog, closeMenu, data, openDialog, store} from "../../store";
import classes from './index.scss';
import {Link} from "react-router-dom";
import {HomeHeader} from "../../components/MyHeader";
import ListItem from '@material-ui/core/ListItem/ListItem';
import ListItemText from "@material-ui/core/ListItemText";
import {observer} from "mobx-react";
import Fab from '@material-ui/core/Fab';
import Drawer from "@material-ui/core/Drawer";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Reply from "@material-ui/icons/Reply";

type Props = {};

@observer
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
        this.restoreToBeforeJump();
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    render() {
        const {chinese, japanese} = data;
        const {searchWord} = store;
        return <React.Fragment>
            <div className={classes.container}>
                <HomeHeader/>
                <div className={classes["list-root"]} ref={this.container}>
                    <List>
                        {
                            chinese.map((item, index) => {
                                let id = index + 1;
                                if (searchWord && !item.includes(searchWord) && !japanese[index].includes(searchWord)) {
                                    return null;
                                }
                                return <Link onClick={this.beforeJump} to={`/details/${id}`} key={item}>
                                    <ListItem classes={{
                                        root: classes["item-root"]
                                    }}>
                                        <ListItemText classes={{
                                            primary: classes["item-primary"]
                                        }} primary={`${id}.${japanese[index]}`} secondary={item}/>
                                    </ListItem>
                                </Link>
                            })
                        }
                    </List>
                    <div className={classes.control}>
                        <Fab onClick={openDialog} className={classes.fab} color={'primary'}>
                            <Reply/>
                        </Fab>
                        {/*<Fab className={classes.fab} color={'primary'}>*/}
                        {/*<KeyboardArrowDown/>*/}
                        {/*</Fab>*/}
                    </div>
                </div>
            </div>

            {/*左侧菜单*/}
            <Drawer onClose={closeMenu} open={store.openMenu}>
                <div className={classes["left-menu"]}>
                    <div className={classes.icon}>
                        <img src={'/icon.png'}/>
                    </div>
                    <h1>日语动漫300句</h1>
                </div>
            </Drawer>

            {/*跳转弹层*/}
            <Dialog onClose={closeDialog} open={store.openDialog}>
                <DialogContent>
                    <DialogContentText>跳转</DialogContentText>
                    <TextField
                        placeholder={'1-300'}
                        autoFocus
                        label="num"
                        type="number"
                        fullWidth
                        inputRef={this.inputNum}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeDialog} color='default'>
                        取消
                    </Button>
                    <Button onClick={this.jump} color="primary">
                        确认
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    }

    /**
     *properties
     */
    container = React.createRef<HTMLDivElement>();
    inputNum = React.createRef<HTMLInputElement>();
    /**
     *method
     */
    beforeJump = () => {
        data.scrollTop = this.container.current.scrollTop;
    };
    restoreToBeforeJump = () => {
        this.container.current.scrollTop = data.scrollTop;
    };
    //跳转
    jump = () => {
        closeDialog();

        let num = parseInt(this.inputNum.current.value);
        if (!isNaN(num)) {
            if (num < 0) {
                num = 0;
            } else if (num > 300) {
                num = 300;
            }
            const {scrollHeight, clientHeight} = this.container.current;
            let itemHeight = scrollHeight / 300 * num;
            let scrollTop = itemHeight - clientHeight;
            if (scrollTop < 0) {
                scrollTop = 0;
            }
            //修正
            if (num > 294) {
                scrollTop = scrollHeight - clientHeight;//修正
            } else if (num > 270) {
                scrollTop += 0;
            } else if (num > 200) {
                scrollTop -= 300;
            } else if (num > 150) {
                scrollTop -= 240;
            } else if (num > 100) {
                scrollTop -= 180;
            }

            this.container.current.scrollTop = scrollTop;
        }


    };

}

export default Home;
