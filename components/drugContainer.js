"use client";

import styled from "styled-components";
import {useDrag} from "react-dnd";
import {useEffect, useState} from "react";
import {getEmptyImage} from "react-dnd-html5-backend";
import {useImageDataContext} from "../context/imageDataContext";

const DrugWrapper = styled.div`
	z-index: 1;
	position: relative;
	overflow: hidden;
	img {
		max-width: 100%;
		transition: all .5s ease-in-out;
		opacity: ${({isImageVisible}) => isImageVisible ? 1 : 0};
		visibility: ${({ isImageVisible }) => isImageVisible ? "visible" : "hidden"};
	}
`;

const Overlay = styled.div`
	z-index: ${({isShowOverlay}) => isShowOverlay ? 0 : 1};
	background: blueviolet;
	position: absolute;
	height: 100%;
	width: 100%;
	opacity: ${({isShowOverlay}) => isShowOverlay ? 0.25 : 0};
	transition: opacity .2s ease-in-out;
`;

export default function DrugContainer ({ entry, image }) {
	const [isShowOverlay, setIsShowOverlay] = useState(false);
	const [isImageVisible, setIsImageVisible] = useState(false);

	const {imagesData, swapImages} = useImageDataContext();

	const [{ isDragging }, drag, preview] = useDrag(() => ({
		type: "box",
		item: { entry, image },
		end: (item, monitor) => {
			const dropResult = monitor.getDropResult()
			if (item && dropResult) {
				swapImages(item, dropResult);
			}
		},
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
			handlerId: monitor.getHandlerId(),
		}),
	}), [imagesData, swapImages]);

	useEffect(() => {
		setIsImageVisible(true);
		preview(getEmptyImage(), { captureDraggingState: true });
	}, []);

	useEffect(() => {
		setTimeout(() => {
			setIsShowOverlay(isDragging);
		});
	}, [isDragging]);

	return (
		<DrugWrapper
			ref={drag}
			isDragging={isDragging}
			isImageVisible={isImageVisible}
		>
			<Overlay isShowOverlay={isShowOverlay}/>
			<img src={image} alt=""/>
		</DrugWrapper>
	);
};