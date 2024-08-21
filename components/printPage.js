import styled from "styled-components";
import Actions from "./actions";
import CustomDragLayer from "./customDragLayer";
import { useImageDataContext } from "../context/imageDataContext";
import PrintImage from "./printImage";

const Wrapper = styled.div`
  width: 600px;
  margin: auto;
  color: #585858;
`;

const PrintWrapper = styled.div``;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.div`
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 20px;
`;

const PageLayout = styled.div`
  display: flex;
  flex-wrap: wrap;
  background: #2778a5;
  border-radius: 8px;
  padding: 20px;
  margin: 17px 0 42px;
  justify-content: space-between;
`;

export default function PrintPage() {
  const { imagesData } = useImageDataContext();

  return (
    <>
      <CustomDragLayer />
      <Wrapper>
        {imagesData?.map((entry) => {
          return (
            <PrintWrapper key={entry.title}>
              <Header>
                <Title>{entry.title}</Title>
                <Actions/>
              </Header>
              <PageLayout>
                {entry.images.map((image, idx) => (
                  <PrintImage
                    image={image}
                    entry={entry.title}
                    key={entry.title + image + idx}
                  />
                ))}
              </PageLayout>
            </PrintWrapper>
          );
        })}
      </Wrapper>
    </>
  );
}
