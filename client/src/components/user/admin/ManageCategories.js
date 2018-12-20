import React from 'react'
import UserLayout from '../../../hoc/UserLayout'
import ManageBrands from './ManageBrands'
import ManageWoods from './ManageWoods'

function ManageCategories() {
  return (
    <UserLayout>
        <ManageBrands></ManageBrands>
        <ManageWoods></ManageWoods>
    </UserLayout>
  )
}

export default ManageCategories
