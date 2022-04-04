# Api Endpoints Design

## Contents
1. [Get All Players](#getallplayers)
2. [Get All Teams](#getallteams)
2. [Create Team](#createteam)

## GetAllPlayers
### Endpoint:
http://localhost:3070/api/players/get-all

### HTTP Method: GET

### Return Value:
<details>
<summary>Return Value:</summary>

```
[
    {
    "PlayerID":Number,
    "FirstName":String,
    "LastName":String,
    "Year":Number,
    "Wins":Number,
    "Losses":Number,		
    "PlayerWinPercentage":Number,	
    "Points":Number,	
    "Rebounds":Number,	
    "Assists":Number,	
    "Steals":Number,	
    "Blocks":String,
    "MissedFieldGoals":Number,
    "MissedFreeThrows":Number,
    "TurnOvers":Number
    },
    {
    "PlayerID":Number,
    "FirstName":String,
    "LastName":String,
    "Year":Number,
    "Wins":Number,
    "Losses":Number,		
    "PlayerWinPercentage":Number,	
    "Points":Number,	
    "Rebounds":Number,	
    "Assists":Number,	
    "Steals":Number,	
    "Blocks":String,
    "MissedFieldGoals":Number,
    "MissedFreeThrows":Number,
    "TurnOvers":Number	
    }
]
```
</details>

<br>

## GetAllTeams

### Endpoint:

http://localhost:3070/api/team/get-all

### HTTP Method: GET

### Return Value:

<details>

<summary>Return Value:</summary>

```
[
    {
        "TeamID":Number,
        "TeamName":String
    },
    {
        "TeamID":Number,
        "TeamName":String
    }
]
```

</details>

<br>

## CreateTeam

### Endpoint:

http://localhost:3070/api/team/create-team

### HTTP Method: POST

### Post Value:

<details>

<summary>Post Value:</summary>

```
{
    "TeamName":String
}
```

</details>

<br>

### Return Value:

<details>

<summary>Return Value:</summary>

```
[
    "Data": {
                "TeamID":Number,
                "TeamName":String
            },
    "Success":Boolean,
    "Message":String
]
```

</details>
