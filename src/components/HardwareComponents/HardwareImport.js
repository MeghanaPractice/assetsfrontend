/*For use of BeQiSoft Pvt Ltd. */

import ImportExcel from '../CommonComponents/TableParts/ImportExcel'

export default function HardwareImport ({ setRefreshTable }) {
  const fields = [
    {
      label: 'Hardware ID',
      key: 'hardwareID',
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
      label: 'Hardware Name',
      key: 'hardwareName',
      fieldType: {
        type: 'input'
      }
    },
    {
      label: 'Purchase Date',
      key: 'purchaseDate',
      fieldType: {
        type: 'input'
      }
    },
    {
      label: 'Assigned To',
      key: 'assignedToEmp',
      fieldType: {
        type: 'input'
      }
    },
    {
      label: 'In Team',
      key: 'inTeamf',
      fieldType: {
        type: 'input'
      }
    },

    {
      label: 'Additional Information',
      key: 'additionalInfo',
      fieldType: {
        type: 'input'
      }
    }
  ]

  return <ImportExcel fields={fields} itemName='hardware' setRefreshTable={setRefreshTable}></ImportExcel>
}
