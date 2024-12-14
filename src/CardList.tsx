import { Button, HStack, Heading, Image, List } from "@chakra-ui/react";
import useCards, { Card } from "./useCards";
import testImage from "./assets/test.gif";

interface Props {
  name: string;
  onSelectCard: (card: Card) => void;
  selectedCard: Card | null;
}

const CardList = ({ name, onSelectCard, selectedCard }: Props) => {
  const { data } = useCards();

  return (
    <>
      <Heading fontSize="2xl" marginBottom={3}>
        {name}
      </Heading>
      <List.Root>
        {data.map((card) => (
          <HStack>
            <Image
              boxSize="32px"
              borderRadius={8}
              objectFit="cover"
              src={testImage}
            ></Image>
            <Button
              whiteSpace="normal"
              textAlign="left"
              fontWeight={
                card.value === selectedCard?.value ? "bold" : "normal"
              }
              onClick={() => onSelectCard(card)}
              fontSize={"large"}
            >
              {card.name}
            </Button>
          </HStack>
        ))}
      </List.Root>
    </>
  );
};

export default CardList;
