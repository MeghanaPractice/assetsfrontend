/*For use of BeQiSoft Pvt Ltd. */

import ImportExcel from '../CommonComponents/TableParts/ImportExcel'

export default function SoftwareImport ({ setRefreshTable }) {
  const fields = [
    {
      label: 'Software ID',
      key: 'softwareID',
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
      label: 'Software Type',
      key: 'type',
      fieldType: {
        type: 'input'
      }
    },
    {
      label: 'Max Users',
      key: 'maxUsers',
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

  return <ImportExcel fields={fields} itemName='software' setRefreshTable={setRefreshTable}></ImportExcel>
}
