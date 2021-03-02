import { connect } from "react-redux";

import Board from "../components/Board";

import {
	entitySelector,
	fetchLoadingStateSelector,
} from "../redux/selectors/boardSelector";
import {
	collectionSelector as columnsSelector,
	fetchListLoadingStateSelector,
} from "../redux/selectors/columnSelector";

import { fetch as requestBoardItem } from "../redux/actions/boardAction";
import {
	fetchList as requestColumnItems,
	createItem as requestCreateColumn,
} from "../redux/actions/columnAction";

const mapStateToProps = (state: {}, props: { itemId: number }) => {
	const { itemId } = props;
	return {
		data: entitySelector(state, itemId),
		isFetch:
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
