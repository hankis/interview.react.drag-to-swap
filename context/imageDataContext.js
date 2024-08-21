"use client";

import {createContext, useCallback, useContext, useEffect, useState} from "react";

const DATA = [
	{
		title: "Front Print",
		images: [
			"https://videodelivery.net/775b1b7196b2c126b8dc343416211fdb/thumbnails/thumbnail.jpg?height=1080",
		],
	},
	{
		title: "Page 2",
		images: [
			"https://videodelivery.net/9ad2bb839e4e3cc1074e5d73b0a0379b/thumbnails/thumbnail.jpg?height=1080",
			"https://imagedelivery.net/66_qOEcY2UwnECf5ON9PhQ/bde5b129-52ba-4f43-b3f4-97591952ea00/large",
		],
	},
	{
		title: "Page 3",
		images: [
			"https://videodelivery.net/91097538e177847ebeb934a492e146e9/thumbnails/thumbnail.jpg?height=1080",
			"https://imagedelivery.net/66_qOEcY2UwnECf5ON9PhQ/b73c2865-7a02-408b-654d-89ce2512ae00/large",
		],
	},
];

export const ImageDataContext = createContext({
	imagesData: DATA,
	swapImages: () => {},
});

export const useImageDataContext = () => useContext(ImageDataContext);

export const ImageDataProvider = ({ children }) => {
	const [ imagesData, setImagesData ] = useState(DATA);

	const swapImages = (current, target) => {
		if (current.entry === target.entry && current.image === target.image) {
			return;
		}

		const newData = imagesData.reduce((acc, entry) => {
			if (entry.title !== current.entry && entry.title !== target.entry) {
				return [...acc, entry];
			}

			const images = [...entry.images];

			if (entry.title === current.entry) {
				const imageIndex = entry.images.indexOf(current.image);
				images[imageIndex] = target.image;
			}

			if (entry.title === target.entry) {
				const imageIndex = entry.images.indexOf(target.image);
				images[imageIndex] = current.image;
			}

			return [...acc, {
				...entry,
				images,
			}];
		}, []);

		setImagesData(newData);
	};

	return (
		<ImageDataContext.Provider value={{
			imagesData,
			swapImages,
		}}>
			{children}
		</ImageDataContext.Provider>
	)
};