/*For use of BeQiSoft Pvt Ltd. */

import React, { useEffect, useState, useContext } from 'react'
import TextField from '@mui/material/TextField'
import {
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { TeamContext } from '../../context/TeamContext'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { addItem as addhardware } from '../../service/addItem'
import { useAlert } from 'react-alert'
import { fetchItems } from '../../service/fetchItems'

export default function HardwareAdd ({ refreshTable, setRefreshTable }) {
  const alert = useAlert()
  const [open, setOpen] = useState(false)
  const { teamIDs, fetchEmployees } = useContext(TeamContext)
  const [teamEmployees, setTeamEmployees] = useState([])
  const [hardwareName, setHardwareName] = useState(null)
  const [hardwareID, setHardwareID] = useState(null)
  const [assignedToEmp, setAssignedToEmp] = useState(null)
  const [inTeamf, setInTeamf] = useState(null)
  const [purchaseDate, setPurchaseDate] = useState(null)
  const [additionalInfo, setAdditionalInfo] = useState(null)
  const [visibleAdd, setVisibleAdd] = useState(false)
  const [hardwareList, sethardwareList] = useState([])

  useEffect(() => {
    fetchEmployees(inTeamf, setTeamEmployees)
  }, [inTeamf])

  useEffect(() => {
    const fetchhardwareList = async () => {
      try {
        const hardwares = await fetchItems('hardware')
        sethardwareList(hardwares)
      } catch (error) {
        console.error('Error fetching hardware list:', error)
      }
    }

    fetchhardwareList()
  }, [])

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleClick = e => {
    e.preventDefault()
    const hardware = {
      hardwareID,
      hardwareName,
      purchaseDate,
      assignedToEmp,
      inTeamf,
      additionalInfo
    }
    console.log(hardware)
    if (hardwareID && hardwareName) {
      addhardware('hardware', hardware)
        .then(() => {
          console.log(`New hardware asset added ${hardware.hardwareID}`)
          setHardwareID(null)
          setHardwareName(null)
          setAssignedToEmp(null)
          setInTeamf(null)
          setPurchaseDate(null)
          setAdditionalInfo(null)
          alert.success('Added hardware')
          setRefreshTable(true)
          handleClose()
        })
        .catch(error => {
          console.error('Error adding hardware:', error)
        })
    } else {
      console.log('Failed to add hardware')
      alert.error('Some fields are missing')
    }
  }

  return (
    <div>
      <Button
        variant='contained'
        className='button-gradient'
        onClick={handleClickOpen}
        style={{ margin: '5px' }}
      >
        <AddIcon />
        Add hardware
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add hardware</DialogTitle>
        <DialogContent>
          <div className='div-centerstyle' style={{ padding: '20px' }}>
            <form className='root' noValidate autoComplete='off'>
              <TextField
                id='hardwareID-input'
                label='Hardware ID'
                variant='outlined'
                fullWidth
                value={hardwareID}
                required={true}
                error={!Boolean(hardwareID)}
                onChange={e => setHardwareID(e.target.value)}
                style={{ margin: '20px auto' }}
              />
              <FormControl fullWidth style={{ margin: '20px auto' }}>
                <InputLabel required id='hardware-select-label'>
                  Hardware Name
                </InputLabel>
                <Select
                  id='hardware-select'
                  variant='outlined'
                  fullWidth
                  value={hardwareName}
                  label='Hardware Name'
                  required={true}
                  error={!Boolean(hardwareName)}
                  onChange={e => setHardwareName(e.target.value)}
                  MenuProps={{
                    anchorOrigin: {
                      vertical: 'top',
                      horizontal: 'center'
                    }
                  }}
                >
                  <MenuItem>
                    <Button
                      variant='outlined'
                      color='info'
                      onClick={() => setVisibleAdd(true)}
                    >
                      <AddIcon /> Add hardware name in the field below
                    </Button>
                  </MenuItem>
                  {hardwareList.map(hard => (
                    <MenuItem key={hard.hardwareID} value={hard.hardwareName}>
                      {hard.hardwareName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {visibleAdd ? (
                <TextField
                  id='hardwareName-input'
                  placeholder='Type in the name'
                  variant='outlined'
                  fullWidth
                  value={hardwareName}
                  onChange={e => setHardwareName(e.target.value)}
                  style={{ margin: '20px auto' }}
                />
              ) : null}
              <FormControl fullWidth style={{ margin: '20px auto' }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label='Purchase Date'
                    value={purchaseDate}
                    format='YYYY/MM/DD'
                    onChange={newVal => setPurchaseDate(newVal)}
                  />
                </LocalizationProvider>
              </FormControl>
              <FormControl fullWidth style={{ margin: '20px auto' }}>
                <InputLabel id='teamID-select-label'>Team</InputLabel>
                <Select
                  id='teamID-select'
                  variant='outlined'
                  fullWidth
                  value={inTeamf}
                  label='Team'
                  onChange={e => setInTeamf(e.target.value)}
                  MenuProps={{
                    anchorOrigin: {
                      vertical: 'top',
                      horizontal: 'center'
                    }
                  }}
                >
                  {teamIDs.map(team => (
                    <MenuItem key={team} value={team}>
                      {team}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth style={{ margin: '20px auto' }}>
                <InputLabel id='emp_ID-select-label'>Employee</InputLabel>
                <Select
                  id='emp_ID-select'
                  variant='outlined'
                  fullWidth
                  value={assignedToEmp}
                  label='Employee'
                  onChange={e => setAssignedToEmp(e.target.value)}
                  MenuProps={{
                    anchorOrigin: {
                      vertical: 'top',
                      horizontal: 'center'
                    }
                  }}
                >
                  {teamEmployees.map(employee => (
                    <MenuItem key={employee} value={employee}>
                      {employee}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                id='additionalInfo-input'
                label='Comments'
                variant='outlined'
                fullWidth
                value={additionalInfo}
                onChange={e => setAdditionalInfo(e.target.value)}
                style={{ margin: '20px auto' }}
              />
            </form>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Cancel
          </Button>
          <Button variant='contained' color='secondary' onClick={handleClick}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
