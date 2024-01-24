import {Grid, Heading, Table, TableContainer, Tbody, Td, Text, Tfoot, Th, Thead, Tr} from "@chakra-ui/react";
import { usePioneer } from "lib/context/Pioneer";
import React, { useState } from "react";

const Basic = () => {
  const { state } = usePioneer();
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
  return (
    <div>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Context</Th>
              <Th>Value</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>Wallet Context</Td>
              <Td>{context}</Td>
            </Tr>
            <Tr>
              <Td>Asset Context</Td>
              <Td>{assetContext?.asset?.name}</Td>
            </Tr>
            <Tr>
              <Td>Blockchain Context</Td>
              <Td>{blockchainContext?.name}</Td>
            </Tr>
            <Tr>
              <Td>Address for context</Td>
              <Td>{address}</Td>
            </Tr>
            <Tr>
              <Td>Outbound asset context</Td>
              <Td>{address}</Td>{" "}
              {/* Note: The original code had the same address for 'Outbound asset context' and 'Address for context', so this remains unchanged. If it's a mistake, you might want to correct it. */}
            </Tr>
          </Tbody>
          <Tfoot>
            <Tr>
              <Th>Context</Th>
              <Th>Value</Th>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Basic;
