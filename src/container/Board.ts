import { connect } from "react-redux";

import Board from "../components/Board";

import {
	entitySelector,
	fetchLoadingStateSelector,
} from "../redux/selectors/boardSelector";

import { fetch as requestBoardItem } from "../redux/actions/boardAction";

const mapStateToProps = (state: {}, props: { itemId: number }) => {
	const { itemId } = props;
	return {
		data: entitySelector(state, itemId),
		isFetch: fetchLoadingStateSelector(state),
		columns: [],
	};
};

const mapDispatchToProps = {
	requestBoardItem,
};

export default connect(mapStateToProps, mapDispatchToProps)(Board);
