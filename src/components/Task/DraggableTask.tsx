import React from "react";
import { useDrag } from "react-dnd";

import Task, { TaskContainerProps, TaskItem } from "./Task";

export const TaskType = "task";

export interface DragItem {
	type: string;
	data: TaskItem;
}

const DraggableTask: React.FC<TaskContainerProps> = (props) => {
	const { data } = props;

	const [{ isDragging }, drag, dragPreviewRef] = useDrag(
		() => ({
			item: { type: TaskType, data },
			collect: (monitor) => ({
				isDragging: !!monitor.isDragging(),
			}),
		}),
		[data]
	);

	return (
		<div ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}>
			<Task dragPreviewRef={dragPreviewRef} {...props} />
		</div>
	);
};

export default DraggableTask;
