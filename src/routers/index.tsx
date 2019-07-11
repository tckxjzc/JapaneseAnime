import React from 'react';
import history from './history';
import {Route, Router, Switch,} from 'react-router-dom';
// import {CSSTransition, TransitionGroup,} from 'react-transition-group';
import NotFound from "../pages/NotFound";
import Home from "../pages/Home";
import Details from "../pages/Details";

export default <Router history={history}>
    <Route render={({location}) => {
        {/*<TransitionGroup>*/
        }
        {/*<CSSTransition key={location.pathname} classNames='slide' timeout={500}>*/
        }
        return <Switch location={location}>
            <Route path={'/details/:id'} component={Details}/>
            <Route path={'/404'} component={NotFound}/>
            <Route path={'/'} component={Home}/>
        </Switch>
        //     </CSSTransition>
        // </TransitionGroup>
    }}/>
</Router>
