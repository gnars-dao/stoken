import {
  Button,
  useDisclosure,
  Modal,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  ModalOverlay,
  ModalContent,
  ModalHeader,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { usePioneer } from "lib/context/Pioneer";
import AssetSelect from "lib/components/AssetSelect";
import BlockchainSelect from "lib/components/BlockchainSelect";
import WalletSelect from "lib/components/WalletSelect";

const Home = () => {
  const { state } = usePioneer();
  const { api, app, context, assetContext, blockchainContext, pubkeyContext, modals } =
    state;
  const [address, setAddress] = useState("");
  const [modalType, setModalType] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    console.log("2 pubkeyContext: ", pubkeyContext);
    setAddress(pubkeyContext.master || pubkeyContext.pubkey || pubkeyContext);
  }, [pubkeyContext]);

  const openModal = (type: any) => {
    setModalType(type);
    onOpen();
  };

  let refresh = async () => {
      //TODO why do I need to press refresh?
      console.log("2 pubkeyContext: ", pubkeyContext);
      setAddress(pubkeyContext.master || pubkeyContext.pubkey || pubkeyContext);
      console.log("assetContext: ",assetContext)
  }

  return (
    <div>
      <Modal isOpen={isOpen} onClose={() => onClose()} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{modalType}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* Render content based on modalType */}
            {modalType === "Select wallet" && (
              <div>
                <WalletSelect onClose={onClose}></WalletSelect>
              </div>
            )}
            {modalType === "Select Asset" && (
              <div>
                <AssetSelect onClose={onClose}></AssetSelect>
              </div>
            )}
            {modalType === "Select Blockchain" && (
              <div>
                <BlockchainSelect onClose={onClose}></BlockchainSelect>
              </div>
            )}
            {modalType === "View Address" && <div>address: {address}</div>}
            {modalType === "Select Outbound" && (
              <div>
                <BlockchainSelect onClose={onClose}></BlockchainSelect>
              </div>
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      Wallet Context: {context}
      <Button onClick={() => openModal("Select wallet")}>Select wallet</Button>
      <br />
      Asset Context: {assetContext?.name}
      <Button onClick={() => openModal("Select Asset")}>Select Asset</Button>
      <br />
      Blockchain Context: {blockchainContext?.name}
      <Button onClick={() => openModal("Select Blockchain")}>
        Select Blockchain
      </Button>
      <br />
      Address for context: {address}
      <Button onClick={() => openModal("View Address")}>View Address</Button>
      <br />
      Outbound asset context: {address}
      <Button onClick={() => openModal("Select Outbound")}>Select asset</Button>
      <br />
      <Button onClick={refresh}>refresh</Button>
    </div>
  );
};

export default Home;
