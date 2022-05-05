import React, { useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import { Button, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import api from '../../../services/api';

export default function RemoveTeamPopUp(props: any) {

  const [openRemoveTeamPopUp, setOpenRemoveTeamPopUp] = React.useState(false);

  useEffect(() => {
    //checks loading status
    if (!props.IsLoading) {
      setOpenRemoveTeamPopUp(true)
    }
  }, [props.handleopenRemoveTeamPopUp, props.IsLoading])
  

  const closeRemoveTeamPopup = () => {
    setOpenRemoveTeamPopUp(false);
  }

  //--------------------------- Remove Team api call ---------------------------//
  const handleClickConfirmRemoveTeam = async () => {
    const res: any = await api.RemoveTeam(props.teamObject.TeamID)
    props.getRemovedTeamId(res.data.Data)
    setOpenRemoveTeamPopUp(false);
    //todo catch error's
  }
  

    return(
        <Dialog id="RemoveTeam" open={openRemoveTeamPopUp}>
              {/* todo: need to add reference to team name */}
              <DialogTitle>Remove {props.teamObject.TeamName}</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  You'll lose all data relating to {props.teamObject.TeamName}.

                  Are you sure you want to permanently delete this team?
                </DialogContentText>
              </DialogContent>
              <DialogActions >
                <Button onClick={closeRemoveTeamPopup} style={{ color: "red" }}>Cancel</Button>
                <Button onClick={handleClickConfirmRemoveTeam}>Continue </Button>
              </DialogActions>
            </Dialog>
    )
}