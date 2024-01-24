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
  Text,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";

// Import icons
// @ts-ignore
import KEEPKEY_ICON from "lib/assets/png/keepkey.png";
// @ts-ignore
import METAMASK_ICON from "lib/assets/png/metamask.png";
// @ts-ignore
import PIONEER_ICON from "lib/assets/png/pioneer.png";
import { usePioneer } from "lib/context/Pioneer";

import MiddleEllipsis from "./MiddleEllipsis";

interface Wallet {
  context: string;
  type: string;
  valueUsdContext: number;
  icon: any; // @ts-ignore
  paired: boolean;
}

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

export default function Wallets({ wallets }: { wallets: Wallet[] }) {
  const { state, dispatch } = usePioneer();
  const { user } = state;
  const [currentPage, setCurrentPage] = useState(1);
  const [walletsWithIcons, setWalletsWithIcons] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const walletsPerPage = 3;

  const handlePageChange = (pageNumber: any) => {
    setCurrentPage(pageNumber);
  };

  for (let i = 0; i < wallets.length; i++) {
    const wallet = wallets[i];
    if (wallet.type === "native") {
      wallets[i].icon = PIONEER_ICON;
    } else if (wallet.type === "metamask") {
      wallets[i].icon = METAMASK_ICON;
    } else if (wallet.type === "keepkey") {
      wallets[i].icon = KEEPKEY_ICON;
    }
  }

  const currentWallets = wallets.slice(
    (currentPage - 1) * walletsPerPage,
    currentPage * walletsPerPage
  );
  const totalPages = Math.ceil(wallets.length / walletsPerPage);

  // Function to generate custom pagination array
  const generatePaginationArray = () => {
    const paginationArray = [];
    const totalPageButtons = 5; // Number of page buttons to display around the current page

    if (totalPages <= totalPageButtons) {
      // If total pages are less than or equal to totalPageButtons, show all page numbers
      for (let i = 1; i <= totalPages; i++) {
        paginationArray.push(i);
      }
    } else {
      // If total pages are more than totalPageButtons, generate custom pagination
      const middleButton = Math.floor(totalPageButtons / 2);
      const startPage = Math.max(currentPage - middleButton, 1);
      const endPage = Math.min(currentPage + middleButton, totalPages);

      if (startPage > 1) {
        // Add the first page and ellipsis if the current page is far enough from the first page
        paginationArray.push(1, "...");
      }

      // Add page numbers between startPage and endPage (inclusive)
      for (let i = startPage; i <= endPage; i++) {
        paginationArray.push(i);
      }

      if (endPage < totalPages) {
        // Add the last page and ellipsis if the current page is far enough from the last page
        paginationArray.push("...", totalPages);
      }
    }

    return paginationArray;
  };

  return (
    <Stack spacing={4}>
      <Text fontSize="xl">All paired wallets</Text>
      {currentWallets.map((wallet: Wallet, index: number) => (
        <Box key={index}>
          <HStack spacing={4} alignItems="center">
            <Avatar src={wallet.icon} />
            <Box>
              <small>
                Context: <MiddleEllipsis text={wallet?.context} />
              </small>
              <br />
              <small>Type: {wallet?.type}</small>
              <br />
              <small>Value (USD): {wallet?.valueUsdContext}</small>
              <br />
              <small>Paired: {wallet?.paired ? "Yes" : "No"}</small>
              <br />
            </Box>
          </HStack>
          <HStack mt={2} spacing={2}>
            {/* ... (rest of the buttons and click handlers) */}
          </HStack>
        </Box>
      ))}
      <Box mt={4}>
        {generatePaginationArray().map((page, index) => (
          <Button
            key={index}
            size="sm"
            variant={currentPage === page ? "solid" : "outline"}
            onClick={() => handlePageChange(page)}
          >
            {page === "..." ? "..." : page}
          </Button>
        ))}
      </Box>
    </Stack>
  );
}
