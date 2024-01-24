import React, { useState, useEffect } from "react";
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
  Tab,
  TabList,
  TabPanel,
  TabPanels,
} from "@chakra-ui/react";
import Balances from "lib/components/pioneer/Pioneer/Balances";
import Wallets from "lib/components/pioneer/Pioneer/Wallets";
import Paths from "lib/components/pioneer/Pioneer/Paths";
import Pubkeys from "lib/components/pioneer/Pioneer/Pubkeys";
import Onboarding from "lib/components/Onboarding";
import { usePioneer } from "lib/context/Pioneer";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const { state } = usePioneer();
  const { app, status } = state;
  const [isOnboarded, setIsOnboarded] = useState(false);

  const onStart = async function(){
    try{
      console.log("onStart")
      let isOnboarded = await localStorage.getItem("isOnboarded")
      if(!isOnboarded){
        console.log("Starting onboarding process")
      }
    }catch(e){
      console.error(e)
    }
  }
  useEffect(() => {
    onStart()
  }, []);

  useEffect(() => {
    //console.log("app: ", app);
  }, [app, app?.balances, app?.pubkeys, app?.wallets, app?.paths, status]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={"xl"}>
      <ModalOverlay />
      <ModalContent>
        {!isOnboarded ? (<Onboarding onClose={onClose} />) : (<div>
          <ModalHeader>Pioneer Settings</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Tabs variant="enclosed">
              <TabList>
                <Tab>Wallets</Tab>
                <Tab>Nodes</Tab>
                <Tab>PubKeys</Tab>
                <Tab>Balances</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <Wallets wallets={app?.wallets || []} />
                </TabPanel>
                {/*<TabPanel>*/}
                {/*  <Paths paths={app?.paths || []} />*/}
                {/*</TabPanel>*/}
                <TabPanel>
                  <Pubkeys pubkeys={app?.pubkeys || []} />
                </TabPanel>
                <TabPanel>
                  <Balances balances={app?.balances || []} />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </div>)}
      </ModalContent>
    </Modal>
  );
};

export default SettingsModal;
