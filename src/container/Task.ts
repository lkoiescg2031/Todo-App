import { connect } from "react-redux";

import Task from "../components/Task/Task";

import {
	updateItem as requestUpdateTask,
	deleteItem as requestDeleteTask,
} from "../redux/actions/taskAction";

const mapStateToProps = (state: {}) => {
	return {};
};

const mapDispatchToProps = {
	requestUpdateTask,
	requestDeleteTask,
};

export default connect(mapStateToProps, mapDispatchToProps)(Task);
