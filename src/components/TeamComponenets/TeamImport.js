/*For use of BeQiSoft Pvt Ltd. */

import ImportExcel from '../CommonComponents/TableParts/ImportExcel'

export default function TeamImport ({ setRefreshTable }) {
  const fields = [
    {
      label: 'Team ID',
      key: 'teamID',
      alternateMatches: ['Team ID'],
      fieldType: {
        type: 'input'
      },
      example: 'EPE',
      validations: [
        {
          rule: 'required',
          errorMessage: 'ID is required',
          level: 'error'
        }
      ]
    },
    {
      label: 'Team Name',
      key: 'teamName',
      fieldType: {
        type: 'input'
      }
    }
  ]

  return <ImportExcel fields={fields} itemName='team' setRefreshTable={setRefreshTable}></ImportExcel>
}
