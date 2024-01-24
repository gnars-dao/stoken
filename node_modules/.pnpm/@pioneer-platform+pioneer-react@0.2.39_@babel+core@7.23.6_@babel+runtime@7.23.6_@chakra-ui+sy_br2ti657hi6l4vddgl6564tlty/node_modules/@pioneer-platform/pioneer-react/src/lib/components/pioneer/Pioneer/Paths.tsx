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

interface Path {
  image?: string;
  symbol: string;
  name?: string;
  path?: any;
  size?: string;
  context?: string; // Added context field
  note: string;
  blockchain: string;
  network: string;
  script_type: string;
  available_scripts_types: string[];
  type: string;
  addressNList: number[];
  addressNListMaster: number[];
  curve: string;
  showDisplay: boolean;
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

export default function Paths({ paths }: { paths: any[] }) {
  const { state, dispatch } = usePioneer();
  const { api, app, user } = state;
  const [selectedPath, setSelectedPath] = useState<Path | null>(null);
  const [selectedAction, setSelectedAction] = useState<string | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSelectClick = async (path: Path) => {
    try {
      //
      //console.log("path: ", path);

      //set Path
      let assetFromPioneer = await api.GetAsset({ symbol: path.symbol });
      assetFromPioneer = assetFromPioneer.data[0];
      let blockchainFromPioneer = await api.GetBlockchain({
        symbol: path.symbol,
      });
      blockchainFromPioneer = blockchainFromPioneer.data[0];
      //console.log("assetFromPioneer: ", path);
      //set Blockchain
      await app.setBlockchainContext(blockchainFromPioneer);
      await app.setAssetContext(assetFromPioneer);
      //set pubkey
      // await app.setPubkeyContext(path.context)
      //console.log("app.assetContext: ", app.assetContext);
      //console.log("app.blockchainContext: ", app.blockchainContext);
    } catch (e) {
      console.error(e);
    }
  };

  const handleSendClick = (path: Path) => {
    setSelectedPath(path);
    setSelectedAction("send");
    onOpen();
  };

  const handleReceiveClick = (path: Path) => {
    setSelectedPath(path);
    setSelectedAction("receive");
    onOpen();
  };

  const handleViewClick = (path: Path) => {
    setSelectedPath(path);
    setSelectedAction("view");
    onOpen();
  };

  useEffect(() => {
    const setUser = async () => {
      try {
        if (user && user.wallets) {
          const { walletDescriptions, paths } = user;
          const updatedPaths = paths.map((path: Path) => {
            const walletType = getWalletType(user, path.context);
            const badgeContent = getWalletBadgeContent(walletType);
            return {
              //@ts-ignore
              ...path,
              context: {
                //@ts-ignore
                ...path.context,
                badge: badgeContent,
              },
            };
          });
          dispatch({ type: "SET_BALANCES", payload: updatedPaths });
        }
      } catch (e) {
        console.error("Error: ", e);
      }
    };

    setUser();
  }, [user]);

  // Filter and sort paths based on search query
  const filteredPaths = paths.filter((path: Path) => {
    // Convert the search query and path symbol/name to lowercase for case-insensitive search
    const query = searchQuery.toLowerCase();
    const symbol = path.symbol.toLowerCase();
    const name = path.name ? path.name.toLowerCase() : "";

    // Check if the symbol or name contains the search query
    return symbol.includes(query) || name.includes(query);
  });

  const sortedPaths = filteredPaths.sort((a: Path, b: Path) => b.path - a.path);

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
        {sortedPaths.map((path: Path, index: number) => (
          <Box key={index}>
            <HStack spacing={4} alignItems="center">
              <Avatar src={path.image} />
              <Box>
                {path && (
                  <>
                    <div>
                      <strong>Note:</strong> {path.note}
                    </div>
                    <div>
                      <strong>Blockchain:</strong> {path.blockchain}
                    </div>
                    <div>
                      <strong>Symbol:</strong> {path.symbol}
                    </div>
                    <div>
                      <strong>Network:</strong> {path.network}
                    </div>
                    <div>
                      <strong>Script Type:</strong> {path.script_type}
                    </div>
                    <div>
                      <strong>Available Script Types:</strong>{" "}
                      {path.available_scripts_types?.join(", ")}
                    </div>
                    <div>
                      <strong>Type:</strong> {path.type}
                    </div>
                    <div>
                      <strong>Address N List:</strong>{" "}
                      {path.addressNList?.join(", ")}
                    </div>
                    <div>
                      <strong>Address N List Master:</strong>{" "}
                      {path.addressNListMaster?.join(", ")}
                    </div>
                    <div>
                      <strong>Curve:</strong> {path.curve}
                    </div>
                    <div>
                      <strong>Show Display:</strong>{" "}
                      {path.showDisplay ? "true" : "false"}
                    </div>
                  </>
                )}
              </Box>
            </HStack>
            <HStack mt={2} spacing={2}>
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleSelectClick(path)}
              >
                Select
              </Button>
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
              <p>Selected Asset: {selectedPath?.symbol}</p>
              <Send asset={selectedPath} />
            </div>
          )}
          {selectedAction === "receive" && (
            <div>
              <h3>Selected Action: Receive</h3>
              <p>Selected Asset: {selectedPath?.symbol}</p>
              <Receive />
            </div>
          )}
          {selectedAction === "view" && (
            <div>
              <h3>Selected Action: View</h3>
              <p>Selected Asset: {selectedPath?.symbol}</p>
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
