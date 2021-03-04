import { connect } from "react-redux";

import Card from "../components/Card";

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

export default connect(mapStateToProps, mapDispatchToProps)(Card);
