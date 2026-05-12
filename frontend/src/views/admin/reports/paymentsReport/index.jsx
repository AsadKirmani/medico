import React from "react";
// Chakra imports
import { Flex, SimpleGrid } from "@chakra-ui/react";
// Custom components
import YourTransactions from "views/admin//reports/paymentsReport/components/YourTransactions";
import YourTransfers from "views/admin//reports/paymentsReport/components/YourTransfers";
import Invoices from "views/admin//reports/paymentsReport/components/Invoices";
import Balance from "views/admin//reports/paymentsReport/components/Balance";
import PaymentMethod from "views/admin//reports/paymentsReport/components/PaymentMethod";
export default function PaymentsReport() {
  // Chakra Color Mode
  return (
    <Flex pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <Flex direction='column' width='stretch'>
        <SimpleGrid
          columns={{ sm: 1, md: 1, lg: 1, xl: 3 }}
          gap='20px'
          mb='20px'>
          <Flex direction='column'>
            <Balance mb='20px' />
            <PaymentMethod />
          </Flex>
          <Flex>
            <Invoices />
          </Flex>
          <Flex>
            <YourTransfers />  
          </Flex>
        </SimpleGrid>
      </Flex>
    </Flex>
  );
}
