import React from "react";

// Chakra imports
import { Button, Flex, Text, useColorModeValue } from "@chakra-ui/react";

// Custom components
import Card from "components/card/Card.js";
import ButtonAction from "components/actions/ButtonAction";
import Invoice from "views/admin/main/account/invoice";

export default function Invoices(props) {
  const { ...rest } = props;

  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const brandColor = useColorModeValue("brand.500", "white");
  function getInvoice() {
    return <Invoice />
  }
  return (
    <Card direction='column' w='100%' p='34px' {...rest}>
      <Flex align='center' mb='30px'>
        <Text
          color={textColor}
          fontSize='xl'
          fontWeight='700'
          lineHeight='100%'>
          Invoices
        </Text>
        <Button p='0px' ms='auto' variant='no-hover' bg='transparent' onClick={getInvoice}>
          <Text
            fontSize='md'
            color={brandColor}
            fontWeight='700'
            cursor='pointer'
            my={{ sm: "1.5rem", lg: "0px" }}>
            See all invoices
          </Text>
        </Button>
      </Flex>
        <ButtonAction
          mb='43px'
          name='SIM16-#024215'
          date='January, 17 2023'
          sum='Rs.839'
          action={console.log("succesful action")}
          actionName='View PDF'
        />
     
      <ButtonAction
        mb='43px'
        name='SIM76-#024214'
        date='January, 14 2023'
        sum='Rs.997'
        action={console.log("succesful action")}
        actionName='View PDF'
      />
      <ButtonAction
        mb='43px'
        name='SIM23-#024213'
        date='January, 03 2023'
        sum='Rs.233'
        action={console.log("succesful action")}
        actionName='View PDF'
      />
      <ButtonAction
        mb='43px'
        name='SIM42-#024212'
        date='December, 29 2022'
        sum='Rs.342'
        action={console.log("succesful action")}
        actionName='View PDF'
      />
      <ButtonAction
        mb='43px'
        name='SIM93-#024211'
        date='November, 30 2022'
        sum='Rs.798'
        action={console.log("succesful action")}
        actionName='View PDF'
      />
      <ButtonAction
        name='SIM13-#024210'
        date='September, 07 2022'
        sum='Rs.844'
        action={console.log("succesful action")}
        actionName='View PDF'
      />
    </Card>
  );
}
