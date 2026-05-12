// Chakra imports
import { Flex } from "@chakra-ui/react";
import Card from "components/card/Card";
import React from "react";
import { columnsData } from "./variables/columnsData";
import tableData from "views/admin/inventory/MedicinesList/variables/tableDataUsersOverview.json";
import { Provider } from 'react-redux';
import store from "store";
import StocksTable from "./components/StocksTable";

export default function StocksList() {
  
  return (
    <Flex direction='column' pt={{ sm: "125px", lg: "75px" }}>
      <Card px='0px'>
        <Provider store={store}>
        <StocksTable
          tableData={tableData}
          columnsData={columnsData}
        />
        </Provider>
      </Card>
    </Flex>
  );
}