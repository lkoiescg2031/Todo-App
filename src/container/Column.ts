import { connect } from "react-redux";

import DroppableColumn from "../components/Column/DropableColumn";

import columnSelectors from "../redux/selectors/columnSelector";
import taskSelectors from "../redux/selectors/taskSelector";

import columnActions from "../redux/actions/columnAction";
import taskActions from "../redux/actions/taskAction";

const {
	entitySelector: columnSelector,
	fetchLoadingStateSelector: isColumFetchState,
} = columnSelectors;
const {
	collectionSelector: taskSelector,
	fetchListLoadingStateSelector: isTasksFetchState,
} = taskSelectors;

const {
	fetchItem: requestColumnItem,
	updateItem: requestUpdateColumn,
	deleteItem: requestDeleteColumn,
} = columnActions;

const {
	createItem: requestCreateTask,
	fetchList: requestFetchTasks,
	updateItem: requestUpdateTask,
} = taskActions;

//FIXME 새로 추가된 경우의 컴포넌트만 카드 정보를 조회하도록 설정
const mapStateToProps = (state: {}, props: { itemId: number }) => {
	const { itemId } = props;
	return {
		data: columnSelector(state, itemId),
		isLoading: isColumFetchState(state) || isTasksFetchState(state),
		tasks: taskSelector(state).filter(
			(entity: { columnId: number }) => entity.columnId === itemId
		),
	};
};

const mapDispatchToProps = {
	requestColumnItem,
	requestFetchTasks,
	requestUpdateColumn,
	requestDeleteColumn,
	requestCreateTask,
	requestUpdateTask,
};

export default connect(mapStateToProps, mapDispatchToProps)(DroppableColumn);
