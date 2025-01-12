import { title } from "process";

const cardData=[
    {
        title:"Total Households Inteviewed",
        value: 3000,
        description: "Total households visited",
        tooltip: "Total households visited"
    },
    {
        title: "Total individuals interviewed",
        value: 1500,
        description: "Total individuals interviewed today",
        tooltip: "Total individuals interviewed today"
    },
    {
        title: "Households with Errors",
        value: 2000,
        description: "Households data with Errors",
        tooltip: "Households data with Errors"
    },
    {
        title: "Individuals with Missing Data",
        value: 1000,
        description: "Individuals with missing data",
        tooltip: "Individuals with missing data"
    }
]
const householdData = [
    {
      name: "Alice Johnson",
      email: "alice@example.com",
      amount: "$300",
    },
    {
      name: "Bob Smith",
      email: "bob@example.com",
      amount: "$150",
    },
    {
      name: "Charlie Brown",
      email: "charlie@example.com",
      amount: "$450",
    },
    {
      name: "Diana Ross",
      email: "diana@example.com",
      amount: "$275",
    },
    {
      name: "Edward Norton",
      email: "edward@example.com",
      amount: "$550",
    },
  ]
export {cardData, householdData}