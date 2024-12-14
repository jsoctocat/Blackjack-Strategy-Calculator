import { useEffect, useState } from "react";
import { Card } from "./useCards";
import CardList from "./CardList";
import { HStack, Heading } from "@chakra-ui/react";

export interface CardQuery {
  card: Card;
}

function Calc(dealer: Card, player1: Card, player2: Card) {
  if (dealer == null || player1 == null || player2 == null)
    return "Has not started";

  let checkSplit = player1 === player2;

  if (checkSplit && ShouldSplit(dealer.name, player1.name)) return "Split";

  let isSoftTotal = player1.name === "A" || player2.name === "A";
  let softPlayerHand =
    isSoftTotal && player1.name === "A" ? player2.name : player1.name;

  let softResult = null;

  if (isSoftTotal) softResult = SoftTotalResult(dealer.name, softPlayerHand);

  if (!isSoftTotal || softResult === "Hit") {
    let playerHandValue = player1.value + player2.value;
    let hardResult = HardTotalResult(dealer.name, playerHandValue);

    return hardResult;
  }
  return softResult;
}

function App() {
  const [dealerCardQuery, setDealerCardQuery] = useState<CardQuery>(
    {} as CardQuery
  );
  const [playerCard1Query, setPlayerCard1Query] = useState<CardQuery>(
    {} as CardQuery
  );
  const [playerCard2Query, setPlayerCard2Query] = useState<CardQuery>(
    {} as CardQuery
  );
  const [result, setResult] = useState("Hit");

  useEffect(() => {
    setResult(
      String(
        Calc(dealerCardQuery.card, playerCard1Query.card, playerCard2Query.card)
      )
    );
  }, [dealerCardQuery, playerCard1Query, playerCard2Query]);

  return (
    <>
      <HStack>
        <CardList
          name="Dealer"
          selectedCard={dealerCardQuery.card}
          onSelectCard={(card) =>
            setDealerCardQuery({ ...dealerCardQuery, card })
          }
        ></CardList>

        <CardList
          name="Player1"
          selectedCard={playerCard1Query.card}
          onSelectCard={(card) =>
            setPlayerCard1Query({ ...playerCard1Query, card })
          }
        ></CardList>

        <CardList
          name="Player2"
          selectedCard={playerCard2Query.card}
          onSelectCard={(card) =>
            setPlayerCard2Query({ ...playerCard2Query, card })
          }
        ></CardList>

        <Heading fontSize="2xl" marginBottom={3}>
          Result: {result}
        </Heading>
      </HStack>
    </>
  );
}

function ShouldSplit(dealerHand: string, playerHand: string) {
  if (dealerHand == "A" && (playerHand == "A" || playerHand == "8"))
    return true;

  if (
    dealerHand == "2" &&
    (playerHand == "A" ||
      playerHand == "7" ||
      playerHand == "8" ||
      playerHand == "9")
  )
    return true;

  if (
    dealerHand == "3" &&
    (playerHand == "A" ||
      playerHand == "6" ||
      playerHand == "7" ||
      playerHand == "8" ||
      playerHand == "9")
  )
    return true;

  if (
    dealerHand == "4" &&
    (playerHand == "A" ||
      playerHand == "2" ||
      playerHand == "3" ||
      playerHand == "6" ||
      playerHand == "7" ||
      playerHand == "8" ||
      playerHand == "9")
  )
    return true;

  if (
    dealerHand == "5" &&
    (playerHand == "A" ||
      playerHand == "2" ||
      playerHand == "3" ||
      playerHand == "6" ||
      playerHand == "7" ||
      playerHand == "8" ||
      playerHand == "9")
  )
    return true;

  if (
    dealerHand == "6" &&
    (playerHand == "A" ||
      playerHand == "2" ||
      playerHand == "3" ||
      playerHand == "6" ||
      playerHand == "7" ||
      playerHand == "8" ||
      playerHand == "9")
  )
    return true;

  if (
    dealerHand == "7" &&
    (playerHand == "A" ||
      playerHand == "2" ||
      playerHand == "3" ||
      playerHand == "7" ||
      playerHand == "8")
  )
    return true;

  if (
    dealerHand == "8" &&
    (playerHand == "A" || playerHand == "8" || playerHand == "9")
  )
    return true;

  if (
    dealerHand == "9" &&
    (playerHand == "A" || playerHand == "8" || playerHand == "9")
  )
    return true;

  if (dealerHand == "10" && (playerHand == "A" || playerHand == "8"))
    return true;

  return false;
}

function SoftTotalResult(dealerHand: string, playerHand: string) {
  if (dealerHand == "A" && (playerHand == "9" || playerHand == "8"))
    return "Stand";

  if (dealerHand == "2" && (playerHand == "9" || playerHand == "8"))
    return "Stand";
  if (dealerHand == "2" && playerHand == "7")
    return "Double if allowed, otherwise stand";

  if (dealerHand == "3" && (playerHand == "9" || playerHand == "8"))
    return "Stand";
  if (dealerHand == "3" && playerHand == "7")
    return "Double if allowed, otherwise stand";
  if (dealerHand == "3" && playerHand == "6")
    return "Double if allowed, otherwise hit";

  if (dealerHand == "4" && (playerHand == "9" || playerHand == "8"))
    return "Stand";
  if (dealerHand == "4" && playerHand == "7")
    return "Double if allowed, otherwise stand";
  if (
    dealerHand == "4" &&
    (playerHand == "6" || playerHand == "5" || playerHand == "4")
  )
    return "Double if allowed, otherwise hit";

  if (dealerHand == "5" && (playerHand == "8" || playerHand == "9"))
    return "Stand";
  if (dealerHand == "5" && playerHand == "7")
    return "Double if allowed, otherwise stand";
  if (
    dealerHand == "5" &&
    (playerHand == "2" ||
      playerHand == "3" ||
      playerHand == "4" ||
      playerHand == "5" ||
      playerHand == "6")
  )
    return "Double if allowed, otherwise hit";

  if (dealerHand == "6" && playerHand == "9") return "Stand";
  if (dealerHand == "6" && (playerHand == "7" || playerHand == "8"))
    return "Double if allowed, otherwise stand";
  if (
    dealerHand == "6" &&
    (playerHand == "2" ||
      playerHand == "3" ||
      playerHand == "4" ||
      playerHand == "5" ||
      playerHand == "6")
  )
    return "Double if allowed, otherwise hit";

  if (
    dealerHand == "7" &&
    (playerHand == "7" || playerHand == "8" || playerHand == "9")
  )
    return "Stand";

  if (
    dealerHand == "8" &&
    (playerHand == "7" || playerHand == "8" || playerHand == "9")
  )
    return "Stand";

  if (dealerHand == "9" && (playerHand == "8" || playerHand == "9"))
    return "Stand";

  if (dealerHand == "10" && (playerHand == "8" || playerHand == "9"))
    return "Stand";

  return "Hit";
}

function HardTotalResult(dealerHand: string, playerHandTotal: number) {
  if (dealerHand == "A" && playerHandTotal >= 17 && playerHandTotal <= 21)
    return "Stand";
  if (dealerHand == "A" && playerHandTotal == 11)
    return "Double if allowed, otherwise hit";

  if (dealerHand == "2" && playerHandTotal >= 13 && playerHandTotal <= 21)
    return "Stand";
  if (dealerHand == "2" && playerHandTotal >= 10 && playerHandTotal <= 11)
    return "Double if allowed, otherwise hit";

  if (dealerHand == "3" && playerHandTotal >= 13 && playerHandTotal <= 21)
    return "Stand";
  if (dealerHand == "3" && playerHandTotal >= 9 && playerHandTotal <= 11)
    return "Double if allowed, otherwise hit";

  if (dealerHand == "4" && playerHandTotal >= 12 && playerHandTotal <= 21)
    return "Stand";
  if (dealerHand == "4" && playerHandTotal >= 9 && playerHandTotal <= 11)
    return "Double if allowed, otherwise hit";

  if (dealerHand == "5" && playerHandTotal >= 12 && playerHandTotal <= 21)
    return "Stand";
  if (dealerHand == "5" && playerHandTotal >= 9 && playerHandTotal <= 11)
    return "Double if allowed, otherwise hit";

  if (dealerHand == "6" && playerHandTotal >= 12 && playerHandTotal <= 21)
    return "Stand";
  if (dealerHand == "6" && playerHandTotal >= 9 && playerHandTotal <= 11)
    return "Double if allowed, otherwise hit";

  if (dealerHand == "7" && playerHandTotal >= 17 && playerHandTotal <= 21)
    return "Stand";
  if (dealerHand == "7" && playerHandTotal >= 10 && playerHandTotal <= 11)
    return "Double if allowed, otherwise hit";

  if (dealerHand == "8" && playerHandTotal >= 17 && playerHandTotal <= 21)
    return "Stand";
  if (dealerHand == "8" && playerHandTotal >= 10 && playerHandTotal <= 11)
    return "Double if allowed, otherwise hit";

  if (dealerHand == "9" && playerHandTotal >= 17 && playerHandTotal <= 21)
    return "Stand";
  if (dealerHand == "9" && playerHandTotal >= 10 && playerHandTotal <= 11)
    return "Double if allowed, otherwise hit";

  if (dealerHand == "10" && playerHandTotal >= 17 && playerHandTotal <= 21)
    return "Stand";
  if (dealerHand == "10" && playerHandTotal == 11)
    return "Double if allowed, otherwise hit";

  if (playerHandTotal > 21) return "BUST";

  return "Hit";
}

export default App;
