# What is Spicy Components?
Spicy Components is a collection of reusable and customizable UI components for building modern web applications with a spicy touch. These components are designed to enhance the user experience and make it easy for developers to create visually appealing and interactive interfaces.

# Components
  1. Data table (Grid)
  2. Table Loader
  3. Form Element
        - Text Input Box

## Installation

You can install Spicy Components via npm or yarn:

```bash
npm install spicy-components
# or
yarn add spicy-components
```

## Customization

You can easily customize the style and appearance of the components to fit your project's design. Spicy Components provides options and CSS classes for customization.

Documentation and Examples

For more detailed information on how to use each component and customize them, check out the documentation.

Examples
Here are some examples of how you can use Spicy Components:

## Data Table
Data Table Feature: Our data table component is a versatile tool for presenting and managing tabular data in your web application. It includes built-in sorting, searching, and the ability to download data to Excel for offline use. Each row offers a context menu for easy editing and deletion, simplifying data management tasks, while the "Add New" button provides a straightforward way to insert new records into the table. This feature-rich data table improves data interaction, organization, and user experience.

### Features
  - Sorting
  - Searching
  - Pagination
  - Right click (Edit/Delete) Panel
  - Download to Excel
  - Add new buttons

``` JSX

    import {DataTable} from 'spicy-components';
    const data = [
        {
            firstName: "JOE",
            height: "6ft",
            email: "joe@email.com"
        }
    ]
    const columns = [
        {
            name: "Name",
            key: "name",
            displayFunction: (item)=> item.toLowerCase()
        },
        {
            name: "Email",
            key: "email"
        }
    ]

    /*** on click on edit in context menu */
    const handleEditItem = (e)=>{
        console.log(e);  // row information available here
    }
    /*** on click on delete in context menu */
    const handleDeleteItem = (e)=>{
        console.log(e) // row information available here
    }
    const handleAddButtonClick=()=>{
        //// add new button click handler
    }
    return (
        <div>
           <DataTable
                data={data} 
                columns={columns}
                clickAddHandle={handleAddButtonClick}
                onEdit={handleEditItem}
                onDelete={handleDeleteItem}
            />
    )

```

![Image Alt Text](https://raw.githubusercontent.com/nbarman760/spicy-components/master/images/table.png)

## Table Loader
 
 Its very simple to implements in React application

 ``` JSX
 import { TableLoader } from 'spicy-components';

 // inside render or return function

 return (
    <TableLoader/>
 )

```
![Alt Text](https://raw.githubusercontent.com/nbarman760/spicy-components/master/images/table-loader.gif)




