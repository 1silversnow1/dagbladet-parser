let dispatch;

export default function createAction(paramsOrFunction) {
    try {
        return dispatch(paramsOrFunction);
    } catch (e) {
        if (!dispatch) {
            console.error('Dispatcher is not initialized.');
        } else {
            console.error(e);
        }
    }
}

createAction.init = (store) => {
    dispatch = store.dispatch;
};
