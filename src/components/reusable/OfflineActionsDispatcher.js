import * as reduceractions from '../../actions';
import { store } from '../../store';
import { connect } from 'react-redux';
import { checkData } from '../../utilities/index';

/**
 * this component listens for offline actions and dispatches them
 */

const OfflineActionsDispatcher = ({
    connected,
    addOfflineAction,
    deleteOfflineAction,
    deleteOfflineActions,
    setReset,
    offlineactions
}) => {
    //return null;
    /**
     * component functions
     */
    const executeOfflineActions = () => {
        let offlineActions = [...offlineactions.persistedActionsQueue, ...offlineactions.actionsQueue];
        if (offlineActions.length >= 1 && connected == true) {
            offlineActions.forEach(offlineaction => {
                let funcName = offlineaction.funcName;
                if (checkData(funcName) && checkData(reduceractions[funcName])) {
                    store.dispatch(reduceractions[funcName](offlineaction.param));
                }
            });
            setReset('offlineactionsreducer');
        }
    };
    executeOfflineActions();
    return null;
}

const mapStateToProps = state => ({
    connected: state.network.isConnected,
    offlineactions: state.offlineactionslist,
});



export default connect(mapStateToProps, reduceractions)(OfflineActionsDispatcher);
