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

//FIXME FIXM 새로 추가된 경우의 컴포넌트만 카드 정보를 조회하도록 설정한다.
/**
 * lineNumber : 46
 * 새로 추가된 Column Component가 componentDidMount 호출 시점에
 * FETCH_LIST actions을 dispatch 해서
 * 다른 모든컴포넌트의 isTasksFetchState 값에 영향을 준다.
 * isTasksFetchState 의 반환 값이
 * FETCH_LIST 의 요청쿼리를 비교하여 동알한 경우만 true 가 될 수 있도록 변경 요망
 */
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
