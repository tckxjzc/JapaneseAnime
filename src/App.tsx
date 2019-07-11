import React, {Component} from 'react';
import routers from './routers';
import {theme} from "./theme";
import ThemeProvider from '@material-ui/styles/ThemeProvider';

type Props = {
    // classes,
};

class App extends Component<Props> {
    /**
     * lifecycle
     */
    mounted = false;

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.mounted = true;
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    render() {
        // const {classes} = this.props;
        return <ThemeProvider theme={theme}>
            <div style={{height: '100vh', overflow: 'hidden'}}>
                {routers}
            </div>
        </ThemeProvider>

    }

    /**
     *properties
     */

    /**
     *method
     */

}

export default App;
