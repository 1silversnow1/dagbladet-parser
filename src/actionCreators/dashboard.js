import { actions as notifActions } from 'redux-notifications';
const { notifSend } = notifActions;
import { dashboardService } from '../services';

import { dashboard, common } from '../actionTypes';
const { ON_LOAD_DASHBOARD_INFO, ON_APPROVE_REMARK, ON_DELETE_REMARK } = dashboard;
const { LOAD, ON_LOAD } = common;

export const getDashboardInfo = () => {
    return dispatch => {
        dispatch({
            type: LOAD
        });

        dashboardService.getDashboardInfo()
            .then(res => {
                dispatch({
                    type: ON_LOAD_DASHBOARD_INFO,
                    payload: res
                });
            })
            .catch(err => {
                console.error(e);
                dispatch({
                    type: ON_ERROR,
                    payload: e
                });
            });

        dispatch({
            type: ON_LOAD
        });
    }
}

export const approveRemark = (data) => {
    return dispatch => {
        dashboardService.approveRemark(data)
        .then(res => {
            dispatch(notifSend({
                message: 'Remark updated paragraph',
                kind: 'success',
                dismissAfter: 3000
            }));
            dispatch({type: ON_APPROVE_REMARK, payload: data});
        })
        .catch(err => {
            console.error(err);
            dispatch({
                type: ON_ERROR,
                payload: err
            });
        });
    }
}

export const deleteRemark = (data) => {
    return dispatch => {
        dashboardService.deleteRemark(data)
            .then(res => {
                dispatch(notifSend({
                    message: 'Remark has been deleted',
                    kind: 'success',
                    dismissAfter: 3000
                }));
                dispatch({type: ON_DELETE_REMARK, payload: data});
            })
            .catch(err => {
                console.error(err);
                dispatch({
                    type: ON_ERROR,
                    payload: err
                });
            });
    }
}

