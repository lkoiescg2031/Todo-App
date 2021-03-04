import { connect } from "react-redux";

import Task from "../components/Task/DraggableTask";

import taskActions from "../redux/actions/taskAction";

const {
	updateItem: requestUpdateTask,
	deleteItem: requestDeleteTask,
} = taskActions;

const mapStateToProps = (state: {}) => {
	return {};
};

const mapDispatchToProps = {
	requestUpdateTask,
	requestDeleteTask,
};

export default connect(mapStateToProps, mapDispatchToProps)(Task);
