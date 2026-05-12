import { Flex } from "@chakra-ui/react";
import Card from "components/card/Card";
import React from "react";
import OrdersTable from "views/admin/main/orders/components/OrdersTable";
import { columnsData } from "views/admin/main/orders/variable/columnsData";
import tableDataOrders from "views/admin/main/orders/variable/tableData.json";

export default function Orders() {
  return (
    <Flex direction='column' pt={{ sm: "125px", lg: "75px" }}>
      <Card px='0px'>
        <OrdersTable
          tableData={tableDataOrders}
          columnsData={columnsData}
        />
      </Card>
    </Flex>
  );
}
