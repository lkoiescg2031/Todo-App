import React from "react";
import { useDrop } from "react-dnd";
import { DragItem, TaskType } from "../Task/DraggableTask";
import { TaskItem } from "../Task/Task";
import Column, { ColumnContainerProps } from "./Column";

interface DroppableProps extends ColumnContainerProps {
	requestUpdateTask: (id: number, params?: TaskItem, meta?: {}) => void;
}

const DroppableColumn: React.FC<DroppableProps> = (props) => {
	const { itemId: columnId, requestUpdateTask } = props;

	const [{ canDrop, isOver }, drop] = useDrop(
		() => ({
			accept: TaskType,
			drop: (item: DragItem) =>
				requestUpdateTask(item.data.id, { ...item.data, columnId }),
			canDrop: (item: DragItem) => item.data.columnId !== columnId,
			collect: (monitor) => ({
				isOver: monitor.isOver(),
				canDrop: monitor.canDrop(),
			}),
		}),
		[columnId]
	);

	return (
		<div
			ref={drop}
			style={
				isOver && canDrop
					? {
							transform: "translateY(10px)",
							transitionDuration: "100ms",
							animationDirection: "alternate",
					  }
					: undefined
			}
		>
			<Column {...props} />
		</div>
	);
};

export default DroppableColumn;
