import React, { useState, useEffect } from 'react';
import instance from '../api/api_instance';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Checkbox from '@mui/material/Checkbox';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';

export default function CheckboxListSecondary(props) {
  const [checked, setChecked] = React.useState([1]);
  const [open, setOpen] = React.useState(false);

  const [memberObjectList, setMemberObjectList] = useState([]);
  const [groupName, setGroupname] = useState('');
  const [memberList, setMemberList] = useState([]);
  const [nameList, setNameList] = useState([]);

  useEffect(() => {
    async function GetGroupInformation() {
      try{ 
        await instance ({
          url: "/group/info",
          method: "GET",
          params: {group_id: props.group_id},       
      }).then((res) => {
        setGroupname(res.data.name)
        setMemberList(res.data.members)
        //Need to define perms
      });
      } catch(e) {
        console.error(e)
      }
    }
    GetGroupInformation();
    } , // <- function that will run on every dependency update
    [] // <-- empty dependency array
  ) 

  const GetMemberInformation = async (id) => {
    try {
      return await instance({
        url: "/user/info",
        method: "GET",
        params: {user_id: id},      
      }).then((res) => {
        const username = res.data.username
        const memberList = [username]

        return memberList
      });
    } catch(e) {
      console.error(e);
    }
  };
  

  useEffect(() => {
    const fetchMemberInformation = async () => {
      const memberIdList = memberList;
      const memberObjectList = [];
      for (const id of memberIdList) {
        const memberInfo = await GetMemberInformation(id);
        memberObjectList.push(memberInfo);
      }
      setNameList(memberObjectList.map(memberInfo => memberInfo[0]));
      setMemberObjectList(memberObjectList.map(memberInfo => memberInfo));
    };
  
    fetchMemberInformation();
  }, [memberList]);


  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };


  return (
    
    <List dense sx={{ width: '100%', maxWidth: 700, bgcolor: 'background.paper' }}>
      {nameList.map((value) => {
        const labelId = `${value}`;
        return (
          <ListItem
            key={value}
            secondaryAction={
              <Button
              className="custom-button"
              variant="contained"
              >
                Change Permissions
              </Button>
            }
            disablePadding
          >
            <ListItemButton>
              <ListItemAvatar>
                <Avatar
                  alt={`Avatar n°${value + 1}`}
                  src={`/static/images/avatar/${value + 1}.jpg`}
                />
              </ListItemAvatar>
              <ListItemText id={labelId} primary={`${value}`} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
}