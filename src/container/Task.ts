import { connect } from "react-redux";

import Task from "../components/Task/Task";

import {
	updateItem as requestUpdateCard,
	deleteItem as requestDeleteCard,
} from "../redux/actions/cardAction";

const mapStateToProps = (state: {}) => {
	return {};
};

const mapDispatchToProps = {
	requestUpdateCard,
	requestDeleteCard,
};

export default connect(mapStateToProps, mapDispatchToProps)(Task);
