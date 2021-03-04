import { connect } from "react-redux";

import ColumnButtonList from "../components/Task/ColumnButtonList";

import { collectionSelector as columnsSelector } from "../redux/selectors/columnSelector";

const mapStateToProps = (state: {}) => ({
	columns: columnsSelector(state),
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ColumnButtonList);
