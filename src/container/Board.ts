import { connect } from "react-redux";

import Board from "../components/Board/Board";

import boardSelectors from "../redux/selectors/boardSelector";
import columnSelectors from "../redux/selectors/columnSelector";

import boardActions from "../redux/actions/boardAction";
import columnActions from "../redux/actions/columnAction";

const { entitySelector, fetchLoadingStateSelector } = boardSelectors;
const {
	collectionSelector: columnsSelector,
	fetchListLoadingStateSelector,
} = columnSelectors;

const { fetchItem: requestBoardItem } = boardActions;

const {
	fetchList: requestColumnItems,
	createItem: requestCreateColumn,
} = columnActions;

const mapStateToProps = (state: {}, props: { itemId: number }) => {
	const { itemId } = props;
	return {
		data: entitySelector(state, itemId),
		isLoading:
			fetchLoadingStateSelector(state) || fetchListLoadingStateSelector(state),
		columns: columnsSelector(state).filter(
			(entity: { boardId: number }) => entity.boardId === itemId
		),
	};
};

const mapDispatchToProps = {
	requestBoardItem,
	requestColumnItems,
	requestCreateColumn,
};

export default connect(mapStateToProps, mapDispatchToProps)(Board);
