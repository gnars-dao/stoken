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

interface Pubkey {
  image?: string;
  symbol: string;
  name?: string;
  pubkey?: any;
  size?: string;
  context?: string; // Added context field
}

const getWalletType = (user: { walletDescriptions: any[] }, context: any) => {
  if (user && user.walletDescriptions) {
    const wallet = user.walletDescriptions.find((w) => w.id === context);
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

export default function Pubkeys({ pubkeys }: { pubkeys: Pubkey[] }) {
  const { state, dispatch } = usePioneer();
  const { api, app, user } = state;
  const [selectedPubkey, setSelectedPubkey] = useState<Pubkey | null>(null);
  const [selectedAction, setSelectedAction] = useState<string | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSelectClick = async (pubkey: Pubkey) => {
    try {
      //
      //console.log("pubkey: ", pubkey);

      //set Pubkey
      let assetFromPioneer = await api.GetAsset({ symbol: pubkey.symbol });
      assetFromPioneer = assetFromPioneer.data[0];
      let blockchainFromPioneer = await api.GetBlockchain({
        symbol: pubkey.symbol,
      });
      blockchainFromPioneer = blockchainFromPioneer.data[0];
      //console.log("assetFromPioneer: ", pubkey);
      //set Blockchain
      await app.setBlockchainContext(blockchainFromPioneer);
      await app.setAssetContext(assetFromPioneer);
      //set pubkey
      // await app.setPubkeyContext(pubkey.context)
      //console.log("app.assetContext: ", app.assetContext);
      //console.log("app.blockchainContext: ", app.blockchainContext);
    } catch (e) {
      console.error(e);
    }
  };

  const handleSendClick = (pubkey: Pubkey) => {
    setSelectedPubkey(pubkey);
    setSelectedAction("send");
    onOpen();
  };

  const handleReceiveClick = (pubkey: Pubkey) => {
    setSelectedPubkey(pubkey);
    setSelectedAction("receive");
    onOpen();
  };

  const handleViewClick = (pubkey: Pubkey) => {
    setSelectedPubkey(pubkey);
    setSelectedAction("view");
    onOpen();
  };

  useEffect(() => {
    const setUser = async () => {
      try {
        if (user && user.wallets) {
          const { walletDescriptions, pubkeys } = user;
          const updatedPubkeys = pubkeys.map((pubkey: Pubkey) => {
            const walletType = getWalletType(user, pubkey.context);
            const badgeContent = getWalletBadgeContent(walletType);
            return {
              //@ts-ignore
              ...pubkey,
              context: {
                //@ts-ignore
                ...pubkey.context,
                badge: badgeContent,
              },
            };
          });
          dispatch({ type: "SET_BALANCES", payload: updatedPubkeys });
        }
      } catch (e) {
        console.error("Error: ", e);
      }
    };

    setUser();
  }, [user]);

  // Filter and sort pubkeys based on search query
  const filteredPubkeys = pubkeys.filter((pubkey: Pubkey) => {
    // Convert the search query and pubkey symbol/name to lowercase for case-insensitive search
    const query = searchQuery.toLowerCase();
    const symbol = pubkey.symbol.toLowerCase();
    const name = pubkey.name ? pubkey.name.toLowerCase() : "";

    // Check if the symbol or name contains the search query
    return symbol.includes(query) || name.includes(query);
  });

  const sortedPubkeys = filteredPubkeys.sort(
    (a: Pubkey, b: Pubkey) => b.pubkey - a.pubkey
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
        {sortedPubkeys.map((pubkey: Pubkey, index: number) => (
          <Box key={index}>
            <HStack spacing={4} alignItems="center">
              <Avatar src={pubkey.image} />
              <Box>
                <small>asset: {pubkey.symbol}</small>
                <br />
                <small>pubkey: {pubkey.pubkey}</small>
              </Box>
            </HStack>
            <HStack mt={2} spacing={2}>
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleSelectClick(pubkey)}
              >
                Select
              </Button>
              {/*<Button*/}
              {/*    size="sm"*/}
              {/*    variant="outline"*/}
              {/*    onClick={() => handleSendClick(pubkey)}*/}
              {/*>*/}
              {/*  Send*/}
              {/*</Button>*/}
              {/*<Button*/}
              {/*    size="sm"*/}
              {/*    variant="outline"*/}
              {/*    onClick={() => handleReceiveClick(pubkey)}*/}
              {/*>*/}
              {/*  Receive*/}
              {/*</Button>*/}
              {/*<Button*/}
              {/*    size="sm"*/}
              {/*    variant="outline"*/}
              {/*    onClick={() => handleViewClick(pubkey)}*/}
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
              <p>Selected Asset: {selectedPubkey?.symbol}</p>
              <Send asset={selectedPubkey} />
            </div>
          )}
          {selectedAction === "receive" && (
            <div>
              <h3>Selected Action: Receive</h3>
              <p>Selected Asset: {selectedPubkey?.symbol}</p>
              <Receive />
            </div>
          )}
          {selectedAction === "view" && (
            <div>
              <h3>Selected Action: View</h3>
              <p>Selected Asset: {selectedPubkey?.symbol}</p>
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
