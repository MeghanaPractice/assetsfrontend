/*For use of BeQiSoft Pvt Ltd. */

import React, { useState, useEffect } from 'react'
import {
  Button,
  Popover,
  List,
  ListItem,
  ListItemText,
  Checkbox,
  Paper
} from '@mui/material'
import { deassignLaptop } from '../../../../service/deassignLaptop'
import { assignLaptop } from '../../../../service/assignLaptop'
import { fetchItems } from '../../../../service/fetchItems'
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-customalert.css'
export default function LaptopSelectCell ({
  value,
  softwareID,
  maxUsers,
  changedBy,
  role
}) {
  const [laptops, setLaptops] = useState(Array.isArray(value) ? value : [])
  const [selectedLaptops, setSelectedLaptops] = useState([])
  const [laptopList, setLaptopList] = useState([])
  const [popoverAnchorEl, setPopoverAnchorEl] = useState(null)
  const [deassignMode, setDeassignMode] = useState(false)

  useEffect(() => {
    const fetchLaptopList = async () => {
      try {
        const temp = await fetchItems('laptopasset')
        const laptopAssetIDs = laptops.map(laptop => laptop.laptopAssetID)
        const filteredTemp = temp.filter(
          t => !laptopAssetIDs.includes(t.laptopAssetID)
        )
        setLaptopList(filteredTemp)
      } catch (error) {
        console.error('Error fetching laptop list:', error)
      }
    }
    fetchLaptopList()
  }, [])

  const handleOpenPopover = event => {
    setPopoverAnchorEl(event.currentTarget)
  }

  const handleClosePopover = () => {
    setPopoverAnchorEl(null)
  }

  const handleLaptopSelect = laptopID => {
    setSelectedLaptops([...selectedLaptops, laptopID])
    console.log(selectedLaptops)
  }

  const handleLaptopDeselect = laptopID => {
    setSelectedLaptops(selectedLaptops.filter(id => id !== laptopID))
  }

  const confirmLaptopAssignment = async () => {
    confirmAlert({
      title: `Assign laptops? Laptops will be assigned immediately and only ${maxUsers} can be assigned in total`,
      buttons: [
        {
          label: 'Confirm',
          onClick: async () => {
            if (selectedLaptops != null) {
              let i
              for (i = 0; i < maxUsers - laptops.length; i++) {
                await assignLaptop(softwareID, selectedLaptops[i],changedBy,role)
              }
            }
          }
        },
        {
          label: 'Cancel'
        }
      ]
    })
  }

  const handleDeassignLaptop = laptopID => {
    setLaptops(laptops.filter(id => id !== laptopID))
    confirmAlert({
      title: `DeAssign laptops? Laptops will be deassigned immediately and only ${maxUsers} can be assigned in total`,
      buttons: [
        {
          label: 'Confirm',
          onClick: async () => {
            deassignLaptop(softwareID, laptopID,changedBy,role)
          }
        },
        {
          label: 'Cancel'
        }
      ]
    })
  }

  return (
    <div>
      <Button
        variant='outlined'
        color='info'
        onClick={event => {
          setDeassignMode(false)
          handleOpenPopover(event)
        }}
      >
        Assign
      </Button>
      <Button
        variant='outlined'
        color='error'
        onClick={event => {
          setDeassignMode(true)
          handleOpenPopover(event)
        }}
      >
        Deassign
      </Button>
      <Popover
        open={Boolean(popoverAnchorEl)}
        anchorEl={popoverAnchorEl}
        sx={{zIndex:1}}
        onClose={handleClosePopover}
      >
        {deassignMode ? (
          <Paper>
            <List>
              {laptops.map(laptop => (
                <ListItem key={laptop.laptopAssetID}>
                  <ListItemText primary={laptop.laptopAssetID} />
                  <Button
                    variant='outlined'
                    color='error'
                    onClick={() => {
                      handleDeassignLaptop(laptop.laptopAssetID)
                    }}
                  >
                    Deassign
                  </Button>
                </ListItem>
              ))}
            </List>
          </Paper>
        ) : (
          <Paper>
            <Button
              variant='outlined'
              color='info'
              sx={{ margin: 5 }}
              onClick={() => {
                confirmLaptopAssignment()
              }}
            >
              Assign Selected
            </Button>
            <List>
              {laptopList.map(laptop => (
                <ListItem key={laptop.laptopAssetID}>
                  <ListItemText primary={laptop.laptopAssetID} />
                  <Checkbox
                    checked={selectedLaptops.includes(laptop.laptopAssetID)}
                    onChange={() =>
                      selectedLaptops.includes(laptop.laptopAssetID)
                        ? handleLaptopDeselect(laptop.laptopAssetID)
                        : handleLaptopSelect(laptop.laptopAssetID)
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        )}
      </Popover>
    </div>
  )
}
