import React from "react";
import SidebarDashboard from "../SidebarDashboard/SidebarDashboard.js";
import HeaderDashboard from "../HeaderDashboard/HeaderDashboard.js";
import { Container } from "@mui/material";
import { Stack } from "@mui/system";

export default function Layout({ children, title }) {
  return (
    <div
      className="layout"
      style={{ display: "flex", justifyContent: "space-between" }}
    >
      <SidebarDashboard />
      <Stack
        direction="column"
        spacing={2}
        paddingX={5}
        margin={2}
        width="100%"
        // position="relative"
        // overflow="auto"
      >
        <HeaderDashboard title={title}/>
        {children}
      </Stack>
    </div>
  );
}
