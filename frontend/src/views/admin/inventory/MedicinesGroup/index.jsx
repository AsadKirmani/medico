import { Flex } from "@chakra-ui/react";
import Card from "components/card/Card";
import React from "react";
import SearchTableUsers from "views/admin/nfts/MedicinesGroup/components/SearchTableUsersOverivew";
import { columnsDataUsersOverview } from "views/admin/nfts/MedicinesGroup/variables/columnsDataUsersOverview";
import tableDataUsersOverview from "views/admin/nfts/MedicinesGroup/variables/tableDataUsersOverview.json";
  
  export default function MedicinesGroup() {
  // Chakra Color Mode
  return (
    <Flex direction='column' pt={{ sm: "125px", lg: "75px" }}>
      <Card px='0px'>
        <SearchTableUsers
          tableData={tableDataUsersOverview}
          columnsData={columnsDataUsersOverview}
        />
      </Card>
    </Flex>
  );
  }
  