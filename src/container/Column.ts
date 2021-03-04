import { connect } from "react-redux";

import DroppableColumn from "../components/Column/DropableColumn";

import {
	entitySelector as columnSelector,
	fetchLoadingStateSelector as isColumFetchState,
} from "../redux/selectors/columnSelector";
import {
	collectionSelector as taskSelector,
	fetchListLoadingStateSelector as isTasksFetchState,
} from "../redux/selectors/taskSelector";

import {
	fetch as requestColumnItem,
	updateItem as requestUpdateColumn,
	deleteItem as requestDeleteColumn,
} from "../redux/actions/columnAction";
import {
	fetchList as requestFetchTasks,
	create as requestCreateTask,
	updateItem as requestUpdateTask,
} from "../redux/actions/taskAction";

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
