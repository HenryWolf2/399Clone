import React, { useState, useEffect } from 'react';
import instance from '../api/api_instance';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Checkbox from '@mui/material/Checkbox';
import Avatar from '@mui/material/Avatar';

export default function CheckboxListSecondary(props) {
  const [checked, setChecked] = React.useState([1]);
  const [open, setOpen] = React.useState(false);

  const memberObjectList = {};
  const [groupName, setGroupname] = useState('');
  const [memberList, setMemberList] = useState([]);

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

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')

  const GetMemberInformation = async (user_id) => {
    try{ 
      await instance ({
        url: "/profile/get",
        method: "GET",
        params: ["user_id"]          
    }).then((res) => {
      console.log(res)

      const firstName = res.data.first_name;
      const lastName = res.data.last_name;
      const email = res.data.email;

      const memberList = [firstName, lastName, email]

      return memberList
      
    });
    } catch(e) {
      console.error(e)
    }
    
  }
  useEffect(() => {
    const memberIdList = memberList;
    memberIdList.forEach(id => {
      GetMemberInformation(id);
    })
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
      {[0, 1, 2, 3, 4, 5, 6].map((value) => {
        const labelId = `checkbox-list-secondary-label-${value}`;
        return (
          <ListItem
            key={value}
            secondaryAction={
              <Checkbox
                edge="end"
                onChange={handleToggle(value)}
                checked={checked.indexOf(value) !== -1}
                inputProps={{ 'aria-labelledby': labelId }}
              />
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
              <ListItemText id={labelId} primary={`Line item ${value + 1}`} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
}