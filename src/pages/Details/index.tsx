import React, {Component} from 'react';
import classes from './index.scss';
import {observer} from "mobx-react";
import {store} from "../../store";
import {isNotInt} from "../../utils/validate";
import {DetailsHeader} from "../../components/MyHeader";
import {destroyPlayer, setPlayer} from "../../utils/player";

type Props = {};

@observer
class Details extends Component<Props> {
    /**
     * lifecycle
     */
    constructor(props) {
        super(props);
        let id = props.match.params.id;
        if (isNotInt(id)) {
            alert('NotFound');
        } else {
            store.id = id;
        }

    }

    componentDidMount(): void {
        setPlayer(this.audioContainer.current);
    }

    componentWillUnmount(): void {
        destroyPlayer();
    }

    render() {
        return <div className={classes.container}>
            <DetailsHeader/>
            <div className={classes.body}>
                <p dangerouslySetInnerHTML={{__html: store.details}}/>
            </div>
            {/*音频播放器，首页隐藏，详情页显示*/}
            <div ref={this.audioContainer} className={classes.player}>

            </div>
        </div>;
    }


    /**
     *properties
     */
    audioContainer = React.createRef<HTMLDivElement>();
    /**
     *method
     */
}

export default Details;
