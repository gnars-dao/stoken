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
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { usePioneer } from "lib/context/Pioneer";
import AssetSelect from "lib/components/AssetSelect";
import OutputSelect from "lib/components/OutputSelect";
import BlockchainSelect from "lib/components/BlockchainSelect";
import WalletSelect from "lib/components/WalletSelect";
import Basic from "./components/Basic";
import Balances from "./components/Balances";
import { useParams } from 'react-router-dom';
// import Pubkeys from "./components/Pubkeys";
import Transfer from "./components/Transfer";
// import Swap from "./components/Swap";

const Home = () => {
  const { state, onStart } = usePioneer();
  let { txid } = useParams<{ txid?: string }>();
  const {
    api,
    app,
    context,
    assetContext,
    blockchainContext,
    pubkeyContext,
    modals,
  } = state;
  const [address, setAddress] = useState("");
  const [modalType, setModalType] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [txHash, setTxhash] = useState(null);
  const [step, setStep] = useState(0);
  
  //start the context provider
  useEffect(() => {
    if(txid){
      //set the txid
      // @ts-ignore
      setTxhash(txid);
      setStep(2);
    }
    onStart();
  }, []);
  
  useEffect(() => {
    console.log("2 pubkeyContext: ", pubkeyContext);
    if (pubkeyContext)
      setAddress(
        pubkeyContext?.master || pubkeyContext?.pubkey || pubkeyContext
      );
  }, [pubkeyContext]);

  const openModal = (type: any) => {
    setModalType(type);
    onOpen();
  };

  const refresh = async () => {
    //TODO why do I need to press refresh?
    console.log("2 pubkeyContext: ", pubkeyContext);
    console.log("2 balances: ", app.balances);
    if (pubkeyContext)
      setAddress(
        pubkeyContext?.master || pubkeyContext?.pubkey || pubkeyContext
      );
    console.log("pubkeyContext: ", pubkeyContext);
  };

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
                <AssetSelect onClose={onClose} onlyOwned={true}></AssetSelect>
              </div>
            )}
            {modalType === "Select Blockchain" && (
              <div>
                <BlockchainSelect onClose={onClose}></BlockchainSelect>
              </div>
            )}
            {modalType === "View Address" && (
              <div>
                {JSON.stringify(pubkeyContext)} address: {address}
              </div>
            )}
            {modalType === "Select Outbound" && (
              <div>
                <OutputSelect onClose={onClose} onlyOwned={false}></OutputSelect>
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

      <Tabs>
        <TabList>
          <Tab>Context</Tab>
          <Tab>balances</Tab>
          <Tab>Transfer</Tab>
          <Tab>Swaps</Tab>
          <Tab>Earn</Tab>
          <Tab>Borrow</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Basic></Basic>
          </TabPanel>
          <TabPanel>
            <Balances openModal={openModal}></Balances>
          </TabPanel>
          <TabPanel>
            <Transfer openModal={openModal}></Transfer>
          </TabPanel>
          <TabPanel>
            {/*<Swap openModal={openModal}></Swap>*/}
          </TabPanel>
          <TabPanel>
            <p>
              <h1>Earn</h1>
            </p>
          </TabPanel>
          <TabPanel>
            <p>
              <h1>Borrow</h1>
            </p>
          </TabPanel>
        </TabPanels>
      </Tabs>
      <Button onClick={refresh}>refresh</Button>
    </div>
  );
};

export default Home;
