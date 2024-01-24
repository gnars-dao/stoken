import {
  Grid,
  Spinner,
  Stack,
  Heading,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
    Card,
    CardBody,
    CardHeader,
    Box,
    StackDivider,

} from "@chakra-ui/react";
import { usePioneer } from "lib/context/Pioneer";

import React, { useState, useEffect } from "react";
const Balances = ({ openModal }:any) => {
  const { state } = usePioneer();
  const {
    api,
    app,
    balances,
    context,
    assetContext,
    blockchainContext,
    pubkeyContext,
    modals,
  } = state;
  const [address, setAddress] = useState("");
  const [modalType, setModalType] = useState("");
  const [balancesLocal, setBalancesLocal] = useState([]); // Local state

  useEffect(() => {
    console.log("balances: ", balances);
    if (balances) {
      setBalancesLocal(balances);
    }
  }, [balances]);

  if (balancesLocal.length == 0) {
    return <Spinner />;
  }

  return (
    <Stack spacing={4}>
      {balancesLocal.map((balance:any, index) => (
        <Card key={index}>
          <CardHeader>
            <Heading size="md">{balance.asset.name}</Heading>
          </CardHeader>
          <CardBody>
            <Stack divider={<StackDivider />} spacing="4">
              <Box>
                <Heading size="xs" textTransform="uppercase">
                  Chain
                </Heading>
                <Text pt="2" fontSize="sm">
                  {balance.asset.chain}
                </Text>
              </Box>
              <Box>
                <Heading size="xs" textTransform="uppercase">
                  Amount
                </Heading>
                <Text pt="2" fontSize="sm">
                  {balance.assetAmount.toString()}
                </Text>
              </Box>
              {/* Add more details from the balance object as needed */}
            </Stack>
          </CardBody>
        </Card>
      ))}
    </Stack>
  );
};

export default Balances;
