import React from 'react';
import Dialog from '@mui/material/Dialog';
import { Button, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

export default function RemoveTeamPopUp(props:any) {

    const [openRemoveTeamPop, setOpenRemoveTeamPop] = React.useState(false);

    return(
        <Dialog id="RemoveTeam" open={openRemoveTeamPop}>
              {/* todo: need to add reference to team name */}
              <DialogTitle>Remove {props.teamName}</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  You'll lose all data relating to {props.teamName}.

                  Are you sure you want to permanently delete this team?
                </DialogContentText>
              </DialogContent>
              <DialogActions >
                <Button onClick={handleCloseRemoveTeamPopup} style={{ color: "red" }}>Cancel</Button>
                <Button onClick={handleClickConfirmRemoveTeam}>Continue </Button>
              </DialogActions>
            </Dialog>
    )
}