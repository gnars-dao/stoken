import { Search2Icon } from "@chakra-ui/icons";
import {
  Avatar,
  AvatarBadge,
  Box,
  Button,
  HStack,
  Stack,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  InputGroup,
  InputLeftElement,
  Input,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
//@ts-ignore
import KEEPKEY_ICON from "lib/assets/png/keepkey.png";
//@ts-ignore
import METAMASK_ICON from "lib/assets/png/metamask.png";
//@ts-ignore
import PIONEER_ICON from "lib/assets/png/pioneer.png";
import { usePioneer } from "lib/context/Pioneer";

import Receive from "./Receive";
import Send from "./Send";
import View from "./View";

interface Balance {
  image?: string;
  symbol: string;
  name?: string;
  balance?: any;
  size?: string;
  context?: string; // Added context field
}

const getWalletType = (app: { wallets: any[] }, context: any) => {
  if (app && app.wallets) {
    const wallet = app.wallets.find((w) => w.id === context);
    return wallet ? wallet.type : null;
  }
  return null;
};

const getWalletBadgeContent = (walletType: string) => {
  const icons: any = {
    metamask: METAMASK_ICON,
    keepkey: KEEPKEY_ICON,
    native: PIONEER_ICON,
  };

  const icon = icons[walletType];

  if (!icon) {
    return null;
  }

  return (
    <AvatarBadge boxSize="1.25em" bg="green.500">
      <Image rounded="full" src={icon} />
    </AvatarBadge>
  );
};

export default function Balances({ balances }: { balances: Balance[] }) {
  const { state, dispatch } = usePioneer();
  const { api, app } = state;
  const [selectedBalance, setSelectedBalance] = useState<Balance | null>(null);
  const [selectedAction, setSelectedAction] = useState<string | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSelectClick = async (balance: Balance) => {
    try {
      //
      // console.log("balance: ", balance);

      //set Balance
      let assetFromPioneer = await api.GetAsset({ symbol: balance.symbol });
      assetFromPioneer = assetFromPioneer.data[0];
      let blockchainFromPioneer = await api.GetBlockchain({
        symbol: balance.symbol,
      });
      blockchainFromPioneer = blockchainFromPioneer.data[0];
      // console.log("assetFromPioneer: ", balance);
      //set Blockchain
      await app.setBlockchainContext(blockchainFromPioneer);
      await app.setAssetContext(assetFromPioneer);
      //set pubkey
      // await app.setPubkeyContext(balance.context)
      // console.log("app.assetContext: ", app.assetContext);
      // console.log("app.blockchainContext: ", app.blockchainContext);
    } catch (e) {
      console.error(e);
    }
  };

  const handleSendClick = (balance: Balance) => {
    setSelectedBalance(balance);
    setSelectedAction("send");
    onOpen();
  };

  const handleReceiveClick = (balance: Balance) => {
    setSelectedBalance(balance);
    setSelectedAction("receive");
    onOpen();
  };

  const handleViewClick = (balance: Balance) => {
    setSelectedBalance(balance);
    setSelectedAction("view");
    onOpen();
  };

  useEffect(() => {
    const setUser = async () => {
      try {
        console.log("balances: ", app.balances);
        if (app && app.wallets) {
          const { wallets, balances } = app;
          const updatedBalances = balances.map((balance: Balance) => {
            const walletType = getWalletType(app, balance.context);
            const badgeContent = getWalletBadgeContent(walletType);
            return {
              //@ts-ignore
              ...balance,
              context: {
                //@ts-ignore
                ...balance.context,
                badge: badgeContent,
              },
            };
          });
          dispatch({ type: "SET_BALANCES", payload: updatedBalances });
        }
      } catch (e) {
        console.error("Error: ", e);
      }
    };

    setUser();
  }, [app, app?.balances, app?.pubkeys, app?.wallets, app?.paths, status]);

  // Filter and sort balances based on search query
  const filteredBalances = balances.filter((balance: Balance) => {
    // Convert the search query and balance symbol/name to lowercase for case-insensitive search
    const query = searchQuery.toLowerCase();
    const symbol = balance.symbol.toLowerCase();
    const name = balance.name ? balance.name.toLowerCase() : "";

    // Check if the symbol or name contains the search query
    return symbol.includes(query) || name.includes(query);
  });

  const sortedBalances = filteredBalances.sort(
    (a: Balance, b: Balance) => b.balance - a.balance
  );

  // CSS for the scrollable container
  const scrollContainerStyles: React.CSSProperties = {
    maxHeight: "15em", // This value may need to be adjusted according to your design
    overflowY: "scroll",
  };

  return (
    <Stack spacing={4}>
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <Search2Icon color="gray.300" />
        </InputLeftElement>
        <Input
          placeholder="Bitcoin..."
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </InputGroup>
      <Box style={scrollContainerStyles}>
        {sortedBalances.map((balance: Balance, index: number) => (
          <Box key={index}>
            <HStack spacing={4} alignItems="center">
              <Avatar src={balance.image} />
              <Box>
                <small>asset: {balance.symbol}</small>
                <br />
                <small>balance: {balance.balance}</small>
              </Box>
            </HStack>
            <HStack mt={2} spacing={2}>
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleSelectClick(balance)}
              >
                Select
              </Button>
              {/*<Button*/}
              {/*    size="sm"*/}
              {/*    variant="outline"*/}
              {/*    onClick={() => handleSendClick(balance)}*/}
              {/*>*/}
              {/*  Send*/}
              {/*</Button>*/}
              {/*<Button*/}
              {/*    size="sm"*/}
              {/*    variant="outline"*/}
              {/*    onClick={() => handleReceiveClick(balance)}*/}
              {/*>*/}
              {/*  Receive*/}
              {/*</Button>*/}
              {/*<Button*/}
              {/*    size="sm"*/}
              {/*    variant="outline"*/}
              {/*    onClick={() => handleViewClick(balance)}*/}
              {/*>*/}
              {/*  View*/}
              {/*</Button>*/}
            </HStack>
          </Box>
        ))}
      </Box>

      <Modal isOpen={isOpen} onClose={onClose} isCentered blockScrollOnMount>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{selectedAction}</ModalHeader>
          <ModalCloseButton />
          {selectedAction === "send" && (
            <div>
              <h3>Selected Action: Send</h3>
              <p>Selected Asset: {selectedBalance?.symbol}</p>
              <Send asset={selectedBalance} />
            </div>
          )}
          {selectedAction === "receive" && (
            <div>
              <h3>Selected Action: Receive</h3>
              <p>Selected Asset: {selectedBalance?.symbol}</p>
              <Receive />
            </div>
          )}
          {selectedAction === "view" && (
            <div>
              <h3>Selected Action: View</h3>
              <p>Selected Asset: {selectedBalance?.symbol}</p>
              <View />
            </div>
          )}
          <ModalFooter>
            <Button colorScheme="blue" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Stack>
  );
}
