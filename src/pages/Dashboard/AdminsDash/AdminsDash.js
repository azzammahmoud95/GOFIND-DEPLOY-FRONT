import React from "react";
import Layout from "../../../components/Layout/Layout.js";
import TotalAdminsCard from "../../../components/TotalAdminsCard/TotalAdminsCard.js";
import AdminsCard from "../../../components/AdminsCard/AdminsCard.js";
import { Stack } from "@mui/system";
import AdminImg from "../../../assests/Illustration/admindash.svg";
export default function AdminsDash() {
  return (
    <div style={{ backgroundColor: "#F8F9FD" }}>
      <Layout>
        <Stack direction="row" justifyContent="space-between">
          {/* AdminCard */}
          <AdminsCard />

          <Stack direction="column" spacing={4} width="30%">
            {/* Start Total admin */}
            <TotalAdminsCard />
            <img
              src={AdminImg}
              alt="adminImg"
              width="430"
              style={{ marginTop: "100px" }}
            />
          </Stack>
        </Stack>
      </Layout>
    </div>
  );
}
