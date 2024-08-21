import styled from "styled-components";
import {memo} from "react";
import DrugContainer from "./drugContainer";
import DropContainer from "./dropContainer";

const PrintImageWrapper = styled.div`
	cursor: move;
	position: relative;
	width: calc(50% - 10px);
`;

function PrintImage({entry, image}) {
	return (
		<PrintImageWrapper>
			<DrugContainer
				entry={entry}
				image={image}
			/>
			<DropContainer
				entry={entry}
				image={image}
			/>
		</PrintImageWrapper>
	)
}

export default memo(PrintImage);