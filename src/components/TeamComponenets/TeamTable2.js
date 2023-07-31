import TableComponent from '../CommonComponents/TableComponent';

export default function TeamTable({ refreshTable }) {
    const columns = [
        { field: 'teamID', headerName: 'Team ID', editable: true, flex: 1 },
        { field: 'teamName', headerName: 'Team name', editable: true, flex: 1 },
    ];
    const itemName = 'team';
    const itemID = 'teamNo';
   
    return (
       <TableComponent
       refreshTable={refreshTable}
       itemName={itemName}
       itemID={itemID}
       columns={columns}
       ></TableComponent>
    );
}
