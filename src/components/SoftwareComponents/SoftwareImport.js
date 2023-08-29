/*For use of BeQiSoft Pvt Ltd. */

import ImportExcel from '../CommonComponents/TableParts/ImportExcel'

export default function SoftwareImport () {
  const fields = [
    {
      label: 'Software ID',
      key: 'softwareID',
      fieldType: {
        type: 'input'
      }
    },
    {
      label: 'Software Number',
      key: 'softwareNo',
      fieldType: {
        type: 'input'
      }
    },
    {
      label: 'Software Key',
      key: 'softwareKey',
      fieldType: {
        type: 'input'
      }
    },
    {
      label: 'Software Name',
      key: 'softwareName',
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
      label: 'Expiration Date',
      key: 'expirationDate',
      fieldType: {
        type: 'input'
      }
    },
    {
      label: 'Assigned To',
      key: 'assignedTo',
      fieldType: {
        type: 'input'
      }
    },
    {
      label: 'In Team',
      key: 'inTeam',
      fieldType: {
        type: 'input'
      }
    },
    {
      label: 'Username',
      key: 'username',
      fieldType: {
        type: 'input'
      }
    },
    {
      label: 'Password',
      key: 'password',
      fieldType: {
        type: 'input'
      }
    },
    {
      label: 'Additional Information',
      key: 'additionalInformation',
      fieldType: {
        type: 'input'
      }
    }
  ]

  return <ImportExcel fields={fields} itemName='software'></ImportExcel>
}
