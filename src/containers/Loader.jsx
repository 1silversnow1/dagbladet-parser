import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Loader } from '../components';

const LoaderContainer = (props) => props.loading && <Loader {...props}/>

const mapStateToProps = state => ({
    loading: state.common.loading
});

export default connect(mapStateToProps)(LoaderContainer);