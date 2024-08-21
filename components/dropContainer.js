"use client";

import styled from "styled-components";
import {useDragDropManager, useDrop} from "react-dnd";
import {useImageDataContext} from "../context/imageDataContext";

const DropWrapper = styled.div`
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	position: absolute;
	background: blueviolet;
	opacity: ${({ isActive }) => isActive ? 0.25 : 0};
	transition: opacity .2s ease-in-out;
	z-index: ${({ isProcessing }) => isProcessing ? 2 : 0};
`;

export default function DropContainer({ entry, image }) {
	const { imagesData} = useImageDataContext();

	const manager = useDragDropManager();
	const process = manager.getMonitor().getItem();

	const [{ canDrop, isOver }, drop] = useDrop(() => ({
		accept: "box",
		drop: () => ({ entry, image }),
		collect: (monitor) => ({
			isOver: monitor.isOver(),
			canDrop: monitor.canDrop(),
		}),
	}), [imagesData]);

	const isActive = canDrop && isOver;

	const isProcessing = process && !(process.entry === entry && process.image === image);

	return (
		<DropWrapper
			isActive={isActive}
			isProcessing={isProcessing}
			ref={drop}
		/>
	);
};