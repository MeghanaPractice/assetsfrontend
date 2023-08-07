import React, { useState, useEffect } from 'react';
import { OutlinedInput, Button } from '@mui/material';

export default function CommentsEditCell({ id, value, field, apiRef }) {
  const [inputValue, setInputValue] = useState('');
  const [isEditing, setIsEditing] = useState(true);


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
      const updatedValue = value ? value + ', ' + inputValue : inputValue;
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
