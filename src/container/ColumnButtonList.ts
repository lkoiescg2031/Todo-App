import { connect } from "react-redux";

import ColumnButtonList from "../components/Task/ColumnButtonList";

import columnSelectors from "../redux/selectors/columnSelector";
const { collectionSelector: columnsSelector } = columnSelectors;

const mapStateToProps = (state: {}) => ({
	columns: columnsSelector(state),
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ColumnButtonList);
