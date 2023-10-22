import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import '../../assets/styles/global.css';
import Contributors from '../individual-posts/contributors';
import instance from '../api/api_instance';
import PermsCard from './PermsCard';
import MemberCard from './MemberCard';
import EditGroupWindow from './EditGroupWindow';

function GroupDetails(props) {
  const [minimized, setMinimized] = useState(false);

  const toggleMinimized = () => {
    setMinimized(!minimized);
  };


  const [groupname, setGroupname] = useState('')
  const [description, setDescription] = useState('')
  const [banner, setBanner] = useState('')
  const [memberCount, setMemberCount] = useState('')
  const [groupMembers, setGroupMembers] = useState([])
  const [postCount, setPostCount] = useState('')
  const [creationDate, setCreationDate] = useState('')
  const [userPermission, setUserPermission] = useState('')
  const [memberInGroup, setMemberinGroup] = React.useState(false);
  const [inGroupText, setInGroupText] = useState('Request Group Membership');
  const [loggedInId, setLoggedInId] = useState('');
  const [isOwner, setIsOwner] = React.useState(false);
  const [isAdmin, setIsAdmin] = React.useState(false);
  const [inButtonTxt, setInButtonTxt] = useState('Request Access');

  
  useEffect(() => {
    function updatePermissionView() {
      if(userPermission === "admin" || userPermission === "viewer" || userPermission === "poster" || userPermission === "owner") {
        setMemberinGroup(true)
        setInGroupText("Permissions")
      } else if (userPermission === "requested") {
        setInButtonTxt('Access has been requested and is pending admin approval')
      }
    }
    updatePermissionView();
  })

  useEffect(() => {
    async function GetGroupInformation() {
      try{ 
        await instance ({
          url: "/group/info",
          method: "GET",
          params: {group_id: props.group_id},       
      }).then((res) => {
        setLoggedInId(res.data.current_user_id)
        setGroupname(res.data.name)
        setDescription(res.data.description)
        setBanner(res.data.group_pic)
        setMemberCount(res.data.members.length)
        setGroupMembers(res.data.members)
        setPostCount(res.data.posts.length)
        setCreationDate(new Date(res.data.created).toLocaleDateString())
        setUserPermission(res.data.user_permission)
        const currentUserPerm = res.data.user_permission
        if (currentUserPerm === 'admin' || currentUserPerm === 'owner') {
          setIsAdmin(true)
        }
        if (currentUserPerm === "owner" || currentUserPerm === 'requested' || currentUserPerm === 'N/A') {
          setIsOwner(true);
        }

      });
      } catch(e) {
        console.error(e)
      }
    }
    GetGroupInformation();
    } , 
    [props.group_id] 
  ) 
 
  const updateUserPermissions = async (userId, groupId, permission) => {
    if(userPermission === 'requested') {
      setInButtonTxt('Access has been requested and is pending admin approval');
    } else {
      const data = {
        user_id: userId,
        group_id: groupId,
        permissions: permission,
      };
      try {
        await instance.post('/users/assign_groups', data, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
      } catch (error) {
        console.error('Error:', error);
      }
      window.location.reload(false);
    }
  };

  const deleteUser = async (userId, groupId, permission) => {
    const data = {
      user_id: userId,
      group_id: groupId,
      permissions: permission,
    };
    try {
      await instance.put('/groups/update_perms', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      } catch (error) {
        console.error("Error:", error);
      }
      window.location.reload(false);
    }

  let numbers = [];
  for(let i = 0; i < groupMembers.length; i++){
    numbers.push(groupMembers[i][0]);
  }

  const divStyle = {
    width: minimized ? '15%' : '50%',
    backgroundColor: 'grey', 
    height: '1000px',
  };

  const bannerStyle = {
    height: '250px',
    display: 'flex',
    flexDirection: 'column',
    backgroundImage: `url(${instance.defaults.baseURL.replace("/api", "") + banner})`,
    borderBottom: '3px solid white',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: minimized ? 'center' : 'center left',
    boxShadow: '0px 5px 5px rgba(0, 0, 0, 0.2)',
  };
  const minimizeButton = {
    color:'white',
    float: 'right',
    fontSize: '40px',
    marginRight:'10px',
    textAlign: 'right',
    width: '10%',
    height: '15%',
  }

  const expandButton = {
    color:'white',
    fontSize: '40px',
    marginRight:'10px',
    textAlign: 'right',
    width: '50px',
    height: '60px',
  }

  const overlayStyleExpanded = {
    position: 'relative',
    alignItems: 'center',
    width: '500px',
    marginRight: '0px',
    marginLeft: '20px',
    height: '400px',
    display: minimized ? 'none' : 'inline',
  }

  const overlayStyleMinimized = {
    position: 'relative',
    alignItems: 'right',
    width: '56%',
    height: 'auto',
    display: minimized ? 'inline' : 'none',
  }

  const circleDot = {
    width: '10px',
    height: '10px',
    backgroundColor: 'white',
    borderRadius: '50%',
    marginTop: '35px',
    marginRight: '15px',
  }
  return (
    <div
      className={`minimizable-div ${minimized ? 'minimized' : ''}`}
      style={divStyle}
    >
        <div style={bannerStyle}></div>

        <div
        style={{
          height: minimized ? '750px' : '450px',
          display: 'flex',
          flexDirection: 'row',
          backgroundColor: '#35CFFF',
          overflowY: 'scroll',
          boxShadow: '0px 8px 5px rgba(0, 0, 0, 0.2)',
          justifyContent: 'right',
        }}
      >

      

          <div style={overlayStyleExpanded}>

            <h1 style={{color: 'white', marginTop: '50px'}}>{groupname}</h1>
            <div style={{display: 'flex', marginTop: '-40px', color: 'white', fontSize: '14px'}}>
              <h1 style={{marginRight: '15px'}}>{creationDate}</h1>
            </div>
            <hr style={{width:'400px', border:' 2px solid #fff', marginRight: '450px',zIndex:900, marginTop: '-10px'}} />
            <div style={{display: 'flex', marginTop: '-20px', color: 'white', fontSize: '14px'}}>
              <h1 style={{marginRight: '15px'}}><MemberCard group_id={props.group_id} member_count={memberCount}/></h1>
              <span style={circleDot}></span>
              <h1>{postCount} Posts</h1>
            </div>
            <div style={{float:'left', marginTop: '-10px'}}>
              <Contributors collaborators = {numbers} />
            </div>
            <br></br>
            <h1 style={{color: 'white', marginTop: '20px', fontSize: '27px'}}> Description </h1>
            <hr style={{width:'400px', border:' 2px solid #fff', marginRight: '450px',zIndex:900, marginTop: '-10px'}} />
            <p style={{fontSize: '15px', color: 'white'}}>{description}</p>
            {!isAdmin ? ( 
              <div></div>
          ) : ( 
            <EditGroupWindow group_id={props.group_id}></EditGroupWindow>
          )}
          {!isOwner ? ( 
              <Button sx={{marginTop:'50px', backgroundColor:'red', width:'150px'}} color='error' variant='contained' onClick={() => deleteUser(loggedInId, props.group_id, "remove")}>Leave Group</Button>
          ) : ( 
            <div></div>
          )}

        </div>


        <div style={overlayStyleMinimized}> 
        <h1 style={{color: 'white', marginTop: '50px'}}>{groupname}</h1>
          <div style={{display: 'flex', marginTop: '-40px', color: 'white', fontSize: '14px'}}>
            <h1 style={{marginRight: '15px'}}>{creationDate}</h1>
          </div>
          <hr style={{width:'200px', border:' 2px solid #fff', marginRight: '450px',zIndex:900, marginTop: '-10px'}} />

        </div>

        
        


              {!minimized && (
        <Button className="zoom" style={minimizeButton} onClick={toggleMinimized}>
          &#10594;
        </Button>
      )}
      {minimized && (
        <Button className="zoom" style={expandButton} onClick={toggleMinimized}>
          &#10596;
        </Button>
      )}



      </div>

        {!memberInGroup ? (
          <div style={{
            height: '300px',
            backgroundColor: '#02AEEC',
            display: minimized ? 'none' : 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
            <div style={{width: '100%'}}>
            <p style={{fontSize: '15px', color: 'white', fontWeight: 'bold', textAlign:'left', marginLeft:'5px', marginTop: '5px'}}>Status: {userPermission}</p>
            </div>

            <h1 style={{color: 'white', marginTop: '10px'}}> {inGroupText} </h1>
            <div style={{backgroundColor:'grey', width: '85%', height: '60%', marginTop: '0px', border: 'solid 3px white', borderRadius: '10px'}}>

            {!memberInGroup ? (
              <Button variant='contained' sx={{width: '100%', height:'100%'}} onClick={() => updateUserPermissions(loggedInId, props.group_id, 'requested')}>{inButtonTxt}</Button>
            ) : ( 
              <PermsCard group_id={props.group_id}/>
            )}
            
              
            </div>
            
        </div>
        ) : (
          <div style={{
            height: '300px',
            backgroundColor: '#02AEEC',
            display: minimized ? 'none' : 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
            <div style={{width: '100%', marginBottom: '-15px'}}>
            <p style={{fontSize: '15px', color: 'white', fontWeight: 'bold', textAlign:'left', marginLeft:'5px', marginTop: '5px'}}>Status: {userPermission}</p>
            </div>
  
            <h1 style={{color: 'white', marginTop: '10px'}}> {inGroupText} </h1>
            <div style={{overflowY: 'scroll', backgroundColor:'grey', width: '85%', height: '60%', marginTop: '0px', border: 'solid 3px white', borderRadius: '10px'}}>
  
            {!memberInGroup ? (
              <Button variant='contained' sx={{width: '100%', height:'100%'}} onClick={() => updateUserPermissions(loggedInId, props.group_id, "requested")}>{inButtonTxt}</Button>
            ) : ( 
              <PermsCard group_id={props.group_id}/>
            )}
            
              
            </div>
            
        </div>
        )}


    </div>
  );
} 


export default GroupDetails;