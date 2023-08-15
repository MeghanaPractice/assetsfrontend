import React, { useState,useContext} from 'react';
import { OutlinedInput, Button } from '@mui/material';
import { UserRoleContext } from '../../context/UserRoleContext';
export default function CommentsEditCell({ id, value, field, apiRef,}) {
  const [inputValue, setInputValue] = useState('');
  const [isEditing, setIsEditing] = useState(true);
  const { userRole, userID } = useContext(UserRoleContext);


  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await handleSave();
    setIsEditing(false);
  };

  const handleSave = async () => {
    if (inputValue.trim() !== '') {
      const updatedValue = value ? `${value}\n*${userID}(${userRole}): ${inputValue}` : `*${userID}(${userRole}): ${inputValue}`;
      await apiRef.current.setEditCellValue({ id, field, value: updatedValue });
    }
  };

  if (!isEditing) {
    return value;
  }

  return (
    <form onSubmit={handleSubmit}>
      <OutlinedInput value={inputValue} onChange={handleInputChange} />
      <Button variant="contained" color="primary" type="submit">
        Save
      </Button>
    </form>
  );
}
