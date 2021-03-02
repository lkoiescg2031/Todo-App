import { connect } from "react-redux";

import Column from "../components/Column";

import {
	entitySelector as columnSelector,
	fetchLoadingStateSelector as isColumFetchState,
} from "../redux/selectors/columnSelector";
import {
	collectionSelector as cardsSelector,
	fetchListLoadingStateSelector as isCardsFetchState,
} from "../redux/selectors/cardSelector";

import {
	fetch as requestColumnItem,
	updateItem as requestUpdateColumn,
} from "../redux/actions/columnAction";
import { fetchList as requestCardItems } from "../redux/actions/cardAction";

//FIXME 새로 추가된 경우의 컴포넌트만 카드 정보를 조회하도록 설정

const mapStateToProps = (state: {}, props: { itemId: number }) => {
	const { itemId } = props;
	return {
		data: columnSelector(state, itemId),
		isFetch: isColumFetchState(state) || isCardsFetchState(state),
		cards: cardsSelector(state).filter(
			(entity: { columnId: number }) => entity.columnId === itemId
		),
	};
};

const mapDispatchToProps = {
	requestColumnItem,
	requestCardItems,
	requestUpdateColumn,
};

export default connect(mapStateToProps, mapDispatchToProps)(Column);
