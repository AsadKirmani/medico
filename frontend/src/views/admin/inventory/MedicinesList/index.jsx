// Chakra imports
import { Flex } from "@chakra-ui/react";
import Card from "components/card/Card";
import React from "react";
import MedicinesTable from "views/admin/inventory/MedicinesList/components/MedicinesTable";
import { columnsDataUsersOverview } from "views/admin/inventory/MedicinesList/variables/columnsDataUsersOverview";
import tableDataUsersOverview from "views/admin/inventory/MedicinesList/variables/tableDataUsersOverview.json";
import { Provider } from 'react-redux';
import store from "store";

export default function MedicinesList() {
  
  return (
    <Flex direction='column' pt={{ sm: "125px", lg: "75px" }}>
      <Card px='0px'>
        <Provider store={store}>
        <MedicinesTable
          tableData={tableDataUsersOverview}
          columnsData={columnsDataUsersOverview}
        />
        </Provider>
      </Card>
    </Flex>
  );
}