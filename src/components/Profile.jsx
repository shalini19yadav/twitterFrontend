import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import UserContext from '../context/UserContext';
import axios from 'axios';

export default function Profile() {

    const [details, setdetails] = React.useState("");
    console.log(details)
    let store=React.useContext(UserContext)
    let getUser=async()=>{
        let res=await axios.get('https://twitterbackend-3w1y.onrender.com/users/getUser',{
            headers:{
                'Authorization':store.details.token
            }
        })
        let data=res.data;
        setdetails(res.data.user)
        console.log(data)
    }

    React.useEffect(()=>{
        getUser()
    },[])

    //update user information section *****************

    let nameRef=React.useRef()
    let passwordRef=React.useRef()

    const updateHandler=async()=>{
        let obj={};
        let name=nameRef.current.value;
        let password=passwordRef.current.value;

        if(name){
            obj.name=name
        }
        if(password){
            obj.password=password
        }

        let res=await fetch(`https://twitterbackend-3w1y.onrender.com/users/update`,{
            method:"PUT",
            headers:{
                'content-type':'application/json',
                'Authorization':store.details.token
            },
            body:JSON.stringify(obj)
        })
        let data=await res.json()
        console.log(data)
        nameRef.current.value=""
        passwordRef.current.value=""

        getUser()
    }


  return (
    <Box
      sx={{
        width: '100%',
        position: 'relative',
        overflow: { xs: 'auto', sm: 'initial' },
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          display: 'block',
          width: '1px',
          bgcolor: 'warning.300',
          left: '500px',
          top: '-24px',
          bottom: '-24px',
          '&::before': {
            top: '4px',
            content: '"vertical"',
            display: 'block',
            position: 'absolute',
            right: '0.5rem',
            color: 'text.tertiary',
            fontSize: 'sm',
            fontWeight: 'lg',
          },
          '&::after': {
            top: '4px',
            content: '"horizontal"',
            display: 'block',
            position: 'absolute',
            left: '0.5rem',
            color: 'text.tertiary',
            fontSize: 'sm',
            fontWeight: 'lg',
          },
        }}
      />
      <Card
        orientation="horizontal"
        sx={{
          width: '100%',
          flexWrap: 'wrap',
          [`& > *`]: {
            '--stack-point': '500px',
            minWidth:
              'clamp(0px, (calc(var(--stack-point) - 2 * var(--Card-padding) - 2 * var(--variant-borderWidth, 0px)) + 1px - 100%) * 999, 100%)',
          },
          // make the card resizable for demo
          overflow: 'auto',
          resize: 'horizontal',
        }}
      >
        {/* <AspectRatio flex ratio="1" maxHeight={182} sx={{ minWidth: 182 }}>
          <img
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286"
            srcSet="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286&dpr=2 2x"
            loading="lazy"
            alt=""
          />
        </AspectRatio> */}
        <CardContent>
          <Typography sx={{ fontSize: 'xl', fontWeight: 'lg',textTransform:'capitalize' }}>
            {details.name}
          </Typography>
          {/* <Typography
            level="body-sm"
            textColor="text.tertiary"
            sx={{ fontWeight: 'lg' }}
          >
            Senior Journalist
          </Typography> */}
          <Sheet
            sx={{
              bgcolor: 'background.level1',
              borderRadius: 'sm',
              p: 1.5,
              my: 1.5,
              display: 'flex',
              flexDirection:'column',
              gap: 2,
              '& > div': { flex: 1 },
            }}
          >
            <div>
              <Typography level="body-xs" sx={{ fontWeight: 'lg' }}>
                <label htmlFor=''>Update-Name:</label>
                <input ref={nameRef} className='w-50' type="text" placeholder='enter your name' />
              </Typography>
            </div>
            <div>
              <Typography level="body-xs" sx={{ fontWeight: 'lg' }}>
                <lable htmlFor="">Email:</lable>
                <input type="text" disabled value={details.email} className='w-50' placeholder='enter your email' />
              </Typography>
            </div>
            <div>
              <Typography level="body-xs" sx={{ fontWeight: 'lg' }}>
              <label htmlFor=''>Update-Password:</label>
              <input ref={passwordRef} className='w-50' type="text" placeholder='enter your password' />
              </Typography>
            </div>

            <button onClick={updateHandler} className='btn btn-primary'>Update-Details</button>
          </Sheet>
          {/* <Box sx={{ display: 'flex', gap: 1.5, '& > button': { flex: 1 } }}>
            <Button variant="outlined" color="neutral">
              Chat
            </Button>
            <Button variant="solid" color="primary">
              Follow
            </Button>
          </Box> */}
        </CardContent>
      </Card>
    </Box>
  );
}
