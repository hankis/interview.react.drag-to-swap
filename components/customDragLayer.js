"use client"

import styled from "styled-components";
import {useDragLayer} from "react-dnd";
import {useEffect, useState} from "react";

function getDragLayerStyles(initialOffset, currentOffset) {
	if (!initialOffset || !currentOffset) {
		return {
			display: "none"
		};
	}
	const {x, y} = currentOffset;
	const transform = `translate(${x}px, ${y}px)`;
	return {
		transform,
		WebkitTransform: transform
	};
}

const DragLayer = styled.div`
	position: fixed;
	pointer-events: none;
	z-index: 100;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
`;

const DragItem = styled.img`
	width: 80px;
	height: 80px;
	border-radius: 50%;
	border: 3px solid #fff;
	transform: ${(props) => props.isShown && props.isSurfaced ? "scale(1.25)" : props.isShown ? "" : "scale(0.1)"};
	transition: transform .2s ease-in-out;
`

export default function CustomDragLayer () {
	const [ mousePosition, setMousePosition ] = useState({ x: null, y: null });
	const [diffX, setDiffX ] = useState(0);
	const [diffY, setDiffY ] = useState(0);

	const [isSurfaced, setIsSurfaced] = useState(false);
	const [isShown, setIsShown] = useState(false);

	const {
		item,
		itemType,
		isDragging,
		initialOffset,
		currentOffset,
	} = useDragLayer(
		(monitor) => ({
			item: monitor.getItem(),
			itemType: monitor.getItemType(),
			initialOffset: monitor.getInitialSourceClientOffset(),
			currentOffset: monitor.getSourceClientOffset(),
			isDragging: monitor.isDragging()
		}),
	);

	useEffect(() => {
		const updateMousePosition = (ev) => {
			setMousePosition({ x: ev.clientX, y: ev.clientY });
		};
		window.addEventListener('mousedown', updateMousePosition);
		return () => {
			window.removeEventListener('mousedown', updateMousePosition);
		};
	}, []);

	useEffect(() => {
		if (mousePosition && initialOffset) {
			setDiffX(mousePosition.x - initialOffset.x - 40);
			setDiffY(mousePosition.y - initialOffset.y - 40);
		}
	}, [mousePosition, initialOffset]);

	useEffect(() => {
		if (isDragging) {
			setIsShown(isDragging);
			setIsSurfaced(isDragging);
			setTimeout(() => setIsSurfaced(false), 200);
		}
	}, [isDragging]);

	const renderItem = () => {
		if (itemType === "box") {
			return (
				<DragItem
					src={item.image}
					isShown={isShown}
					isSurfaced={isSurfaced}
					alt=""
				/>
			)
		}
		return null;
	};

	if (!isDragging) {
		return null;
	}

	const offset = currentOffset ? {
		x: currentOffset.x + diffX,
		y: currentOffset.y + diffY,
	} : mousePosition;

	return (
		<DragLayer>
			<div style={getDragLayerStyles(initialOffset, offset)}>
				{renderItem()}
			</div>
		</DragLayer>
	)
}