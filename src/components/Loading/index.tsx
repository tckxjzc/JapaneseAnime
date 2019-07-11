import React, {Component} from 'react';
import styles from './index.scss';

class Loading extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return <div className={styles.container} >
            <div className={styles.load}>
                <div className={styles.outer}>

                </div>
                <div className={styles.inner}>
                </div>
            </div>
        </div>
    }
}


export default Loading;