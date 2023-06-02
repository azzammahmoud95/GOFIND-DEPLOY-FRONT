import React from 'react'
import Layout from '../../../components/Layout/Layout.js'
import AdminCategories from '../../../assests/Illustration/categoriesAdmin.svg'
import TotalCategoriesCard from '../../../components/TotalCategoriesCard/TotalCategoriesCard.js'
import { Stack } from '@mui/system'
import CategoriesCard from '../../../components/CategoriesCard/CategoriesCard.js'
export default function CategoriesDash() {
  return (
    <div  style={{ backgroundColor: "#F8F9FD" }}>
      <Layout>
      <Stack direction="row" justifyContent="space-between">
          {/* AdminCard */}
          <CategoriesCard />

          <Stack direction="column" spacing={4} width="30%">
            {/* Start Total admin */}
            <TotalCategoriesCard />
            <img
              src={AdminCategories}
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