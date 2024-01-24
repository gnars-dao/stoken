import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  Card,
  CardBody,
  TabPanel,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";

import { usePioneer } from "lib/context/Pioneer";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}
//@ts-ignore
const AssetModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const { state, dispatch } = usePioneer();
  const { api, app, user, context } = state;
  const [walletDescriptions, setWalletDescriptions] = useState([]);
  const [balances, setBalances] = useState([]);

  const setUser = async function () {
    try {
      if (user && user.wallets) {
        const { wallets, walletDescriptions, balances, pubkeys } = user;
        setWalletDescriptions(walletDescriptions);
        setBalances(balances);
      }
    } catch (e) {
      console.error("header e: ", e);
    }
  };

  useEffect(() => {
    setUser();
  }, [user]); // once on startup

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Asset Select</ModalHeader>
        <ModalCloseButton />
        <ModalBody></ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button variant="ghost">Secondary Action</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AssetModal;
