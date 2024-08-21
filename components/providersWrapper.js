"use client"

import {HTML5Backend} from "react-dnd-html5-backend";
import {DndProvider} from "react-dnd";
import {ImageDataProvider} from "../context/imageDataContext";

export default function ProvidersWrapper ({children}) {
	return (
		<DndProvider backend={HTML5Backend}>
			<ImageDataProvider>
				{children}
			</ImageDataProvider>
		</DndProvider>
	);
};