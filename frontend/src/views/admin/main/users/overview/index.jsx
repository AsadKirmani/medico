import { Flex } from "@chakra-ui/react";
import Card from "components/card/Card";
import React from "react";
import UsersTable from "views/admin/main/users/components/UsersTable";
import { columnsDataUsersOverview } from "views/admin/main/users/variables/columnsDataUsersOverview";
import tableDataUsersOverview from "views/admin/main/users/variables/tableDataUsersOverview.json";

export default function UsersOverview() {
  return (
    <Flex direction='column' pt={{ sm: "125px", lg: "75px" }}>
      <Card px='0px'>
        <UsersTable
          tableData={tableDataUsersOverview}
          columnsData={columnsDataUsersOverview}
        />
      </Card>
    </Flex>
  );
}