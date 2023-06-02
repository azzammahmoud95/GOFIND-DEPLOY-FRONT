import React from 'react'
import Layout from '../../../components/Layout/Layout.js'
import { Stack } from '@mui/system'
import AdminLocation from '../../../assests/Illustration/LocationAdmin.svg'
import TotalLocationsCard from '../../../components/TotalLocationsCard/TotalLocationCards.js'
import LocationsCard from '../../../components/LocationsCard/LocationsCard.js'
export default function LocationsDash() {
  return (
    <div  style={{ backgroundColor: "#F8F9FD" }}>
      <Layout>
        <Stack direction="row" justifyContent="space-between">
          {/* AdminCard */}
          <LocationsCard />

          <Stack direction="column" spacing={4} width="30%">
            {/* Start Total admin */}
            <TotalLocationsCard />
            <img
              src={AdminLocation}
              alt="adminImg"
              width="430"
              style={{ marginTop: "100px" }}
            />
          </Stack>
        </Stack>
      </Layout>
    </div>
  )
}