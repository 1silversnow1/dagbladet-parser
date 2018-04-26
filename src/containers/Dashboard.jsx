import React, { Component } from 'react';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { parse } from 'query-string';
import {
    dashboard
} from '../actionCreators';
import { Dashboard } from '../components';

const {
    getDashboardInfo
} = dashboard;

class DashboardContainer extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getDashboardInfo()
    }

    render() {
        return <Dashboard {...this.props}/>
    }
}

const mapStateToProps = state => ({
    dashboardInfo: state.dashboard.dashboardInfo,
    loading: state.common.loading
})

const mapDispatchToProps = dispatch => bindActionCreators({
    getDashboardInfo
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DashboardContainer);