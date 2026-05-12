// Chakra imports
import { Flex } from "@chakra-ui/react";
import Card from "components/card/Card";
import React from "react";
import { columnsData } from "./variables/columnsData";
import tableData from "views/admin/main/vendors/variables/tableData.json";
import { Provider } from 'react-redux';
import store from "store";
import VendorsTable from "./components/VendorsTable";

export default function CompanyList() {
  
  return (
    <Flex direction='column' pt={{ sm: "125px", lg: "75px" }}>
      <Card px='0px'>
        <Provider store={store}>
        <VendorsTable
          tableData={tableData}
          columnsData={columnsData}
        />
        </Provider>
      </Card>
    </Flex>
  );
}