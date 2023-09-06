/*For use of BeQiSoft Pvt Ltd. */

import ImportExcel from '../CommonComponents/TableParts/ImportExcel'
export default function EmployeeImport ({ setRefreshTable }) {
  const fields = [
    {
      label: 'Employee ID',
      key: 'employeeID',
      fieldType: {
        type: 'input'
      },
      validations: [
        {
          rule: 'required',
          errorMessage: 'ID is required',
          level: 'error'
        }
      ]
    },
    {
      label: 'Employee Name',
      key: 'employeeName',
      fieldType: {
        type: 'input'
      }
    },
    {
      label: 'Team ID Number',
      key: 'teamIDNo',
      fieldType: {
        type: 'input'
      }
    },
    {
      label: 'Designation',
      key: 'designation',
      fieldType: {
        type: 'input'
      }
    },
    {
      label: 'Contact Number',
      key: 'contactNo',
      fieldType: {
        type: 'input'
      }
    },
    {
      label: 'Email',
      key: 'email',
      fieldType: {
        type: 'input'
      }
    }
  ]

  return <ImportExcel fields={fields} itemName='employee' setRefreshTable={setRefreshTable}></ImportExcel>
}
