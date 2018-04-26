import React, { Fragment } from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Header } from './components';
import { ArticleContainer, DashboardContainer, LoaderContainer } from './containers';
import { Loader } from './containers';

const App = (props) => {
    return <Fragment>
        <Header/>

        <Switch>
            <Route exact path="/" component={ArticleContainer}/>
            <Route exact path="/results" component={DashboardContainer}/>
        </Switch>

        <LoaderContainer/>
    </Fragment>
}

const mapStateToProps = state => ({
    loading: state.common.loading
});

export default App;