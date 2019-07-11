import React, {Component} from 'react';
import Loading from '../Loading/index';

type Props = {
    el: Function
};

class Index extends Component<Props> {
    state = {
        Element: null
    };
    mounted: boolean;

    constructor(props) {
        super(props);
    }

    load() {
        this.props.el().then((element) => {
            if (this.mounted)
                this.setState({Element: element.default ? element.default : element})
        })
    }

    componentDidMount() {
        this.mounted = true;
        this.load();
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    componentDidUpdate(prevProps) {
        if (this.props.el != prevProps.el) {
            this.load();
        }
    }

    render() {
        let {Element} = this.state;
        return Element ? <Element/> : <Loading/>;
    }
}


export default Index;