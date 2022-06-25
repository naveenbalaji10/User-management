
import React,{useEffect,useState} from 'react'
import styled from 'styled-components'
import axios from 'axios'
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import { Calendar } from "react-modern-calendar-datepicker";
import validator from 'validator'
import moment from 'moment'



const Container=styled.div`
width:100%;
display:flex;
align-items:center;
flex-direction:column;
margin-top:50px;
filter:blur(${(props)=> props.visible ? '3px' : ''})
`
const TitleContainer=styled.div`
width:80%;
display:flex;
align-items:center;
`
 
const Title=styled.h2`
flex:1;
font-family:'Poppins';
font-weight:500;
font-size:24px;
`

const AddButton=styled.button`
  color:#fff;
  background-color:#000;
  padding:10px;
  border:none;
  border-radius:6px;
  font-size:18px;

  &:hover{
   color:#EEEDE7;
   opacity:0.8;
   transform:scale(1.1);
  }
`

const ListContainer=styled.div`
width:80%;
display:flex;
align-item:center;
margin-top:30px;
`


const Table=styled.table`
border: 2px solid #000;
width: 100%;
border-radius:6px;
`

const Row=styled.tr`

    &:nth-last-child(-n+1) td{
        border-bottom:none;
    }  

display:flex;
align-items:center;
justify-content:space-between;
background-color:${(props)=>props.type === 'head' ? '#08090a' : '#e9e3e6'};
color:${(props)=>props.type === 'head' ? '#fff' : ''};

`


const Head=styled.th`
flex:1;
border-bottom: 3px solid #fff;
border-right:1px solid #fff;
padding:20px;
font-size:18px;
font-weight:600;
font-family:'Poppins';
padding:12px;
`

const Data=styled.td`
flex:1;
display:flex;
align-items:center;
justify-content:center;
text-align:center;
border-bottom: 1px solid black;
border-right:  1px solid black;
&:nth-last-child(-n+1) {
    border-right:none;
}  
height:80px;
`

const Desc=styled.p`
font-size:20px;
font-size:18px;
font-family:'Poppins';
padding:20px 0;
`

const Profile=styled.img`
height:60px;
width:60px;
border-radius:20px;
`

const Icon=styled.i`
font-size:18px;
color:#08090a;

&:hover{
    transform:scale(1.2);
    color:#000;
}
`

const Circle=styled.div`
width:20px;
height:20px;
border-radius:50%;
background-color:${(props)=>props.working ? "green" : "red"};
margin-left:20px;
`

const Modal=styled.div`
width:600px;
height:500px;
background-color:#f6f6f6;
display:${(props)=> props.visible ? 'flex': 'none'};
flex-direction:column;
align-items:center;
position:absolute;
top:15%;
left:calc(50% - 300px);
border-radius:15px;
-webkit-box-shadow: 4px 6px 5px 0px rgba(59,59,59,1);
-moz-box-shadow: 4px 6px 5px 0px rgba(59,59,59,1);
box-shadow: 4px 6px 5px 0px rgba(59,59,59,1);
`

const Close=styled.button`
padding:5px;
background-color:red;
border:none;
border-radius:6px;
position:absolute;
top:10px;
right:10px;
`

const ModalTitle=styled.h3`
font-family:'Poppins';
font-size:24px;
font-weight:600;
text-align:center;
margin-top:20px;
position:relative;
`

const Form=styled.form`
margin:30px;
width:100%;
display:flex;
align-items:center;
flex-direction:column;
`

const InputForm=styled.div`
width:100%;
display:flex;
align-items:center;
margin:10px 0;
position:relative;

`

const Detail=styled.p`
flex:.3;
text-align:left;
font-size:18px;
font-weight:500;
font-family:'Poppins';
margin-left:30px;
`

const  InputContainer=styled.div`
flex:.7;
display:flex;
align-items:center;
`

const Input=styled.input`
width:300px;
padding:6px;
border-radius:5px;
outline:none;
background-color:#e9e3e6;
font-size:14px;
`

const InputCalendar=styled.input`
width:100px;
padding:6px;
border-radius:5px;
outline:none;
background-color:#e9e3e6;
font-size:14px;
margin-right:20px;
`

const CalendarDiv=styled.div`
display:${(props)=>props.hidden  ? 'hidden' : ''};
position:absolute;
top:40px;
right:100px;
`


const CalendarIcon=styled.i`
font-size:20px;
color:#6495ED;

&:hover{
  color:#242F9B;
}
`

   

const InputCheck=styled.input`
margin-left:20px;
`

const CheckboxDesc=styled.p`
font-size:16px;
font-family:'Poppins';
font-weight:500;
margin-left:10px;
`

const ChooseInput=styled.input`
margin-left:10px;
color:#6495ED;
`

const Save=styled.button`
width:100px;
margin-top:20px;
padding:10px;
background-color:#1363DF;
color:#f6f6f6;
font-size:20px;
font-weight:500;
border-radius:10px;
border:none;

&:hover{
  background-color:#242F9B;
}
`

const Error=styled.p`
font-size:12px;
background-color:#FF6363;
padding:4px;
width:250px;
text-align:center;
margin-left:100px;
border-radius:5px;
color:#f6f6f6;
`


const UserPanel = () => {

  const [users,setUsers]=useState([])
  const [visible,setVisible]=useState(false)
  
  const [joindate,setJoinDate]=useState('')
  const [inputJoin,setInputJoin]=useState('')
  const [leavedate,setLeaveDate]=useState('')
  const [inputleave,setInputleave]=useState('')
  const [hidden1,setHidden1]=useState(true)
  const [hidden2,setHidden2]=useState(true)
  const [emailError,setEmailError]=useState('')
  const [dateError,setDateError]=useState('')


  const [name,setName]=useState('')
  const [email,setEmail]=useState('')
  const [working,setWorking]=useState(false)
  const [file, setFile] = useState();
  const [experience,setExperience]=useState('')
  



  const getUsers=async()=>{
      try {
       await axios.get('http://localhost:3001/post').then((res)=>{ 
         console.log(res.data)
        setUsers(res.data) 
       })
     } catch (error) {
     console.log(error)
    }
}

const deleteUser=async(id)=>{
  try {
     await axios.delete(`http://localhost:3001/post/${id}`).then((res)=>{
       if(res.status==200){
         getUsers()

       }
     })
  } catch (error) {
    console.log(error)
  }
}



    useEffect(()=>{
      if(joindate.day){
        const join=`${joindate.day}/${joindate.month}/${joindate.year}`
        setInputJoin(join)
      }
   
    },[joindate])


    useEffect(()=>{
      if(leavedate.day){
        const leave=`${leavedate.day}/${leavedate.month}/${leavedate.year}`
        setInputleave(leave)
      }
   
    },[leavedate])

    const checkEmail=(e)=>{
      if(validator.isEmail(e.target.value)){
        setEmail(e.target.value)
      }else{
        setEmailError('not a valid email')
      }
    }


  const handleChange=(e)=> {
    setFile(e.target.files[0]);
   }

   const handleSumbit=async(e)=>{
    e.preventDefault();
     const formData=new FormData();
     formData.append('profileImage',file);
     formData.append('name',name);
     formData.append('email',email);
     formData.append('experience',experience);
     formData.append('working',working);
 
      try {
        await axios.post('http://localhost:3001/post',formData).then((res)=>{
          if(res.status==200){
            getUsers()
            setVisible(!visible)
            setFile('')
            setEmail('')
            setName('')
            setWorking(false)
          }
        })
      } catch (error) {
        console.log(error)
      }
     }


  useEffect(()=>{
    getUsers()
     },[])
 

     useEffect(()=>{
      let experience1;   

      let leavearray=inputleave.split('/')
      let joinarray=inputJoin.split('/')
      let leavestamp1=new Date(`${leavearray[1]}/${leavearray[0]}/${leavearray[2]}`).getTime()
      let joinstamp1=new Date(`${joinarray[1]}/${joinarray[0]}/${joinarray[2]}`).getTime()
    
    
      if(joinstamp1 > leavestamp1){
        setDateError('please select a valid date')
        console.log('error')
      }else{
        setDateError('')
        let leavestamp=new Date(`${leavearray[1]}/${leavearray[0]}/${leavearray[2]}`)
        let joinstamp=new Date(`${joinarray[1]}/${joinarray[0]}/${joinarray[2]}`)
        let leave=moment(leavestamp)
        let join=moment(joinstamp)
    
        let diff=moment.duration(leave.diff(join))
        experience1=(diff._data.years).toString()
        setExperience(experience1)
      }
      console.log(experience)
  
     },[leavedate])



  return (
    <>
    <Container visible={visible}>
      <TitleContainer>
          <Title>User Records</Title>
          <AddButton onClick={()=>setVisible(!visible)}>Add User</AddButton>
      </TitleContainer>
      <ListContainer>
      <Table>
        <tbody>

        <Row type="head">
          <Head>Avatar</Head>
          <Head>Name</Head>
          <Head>Email</Head>
          <Head>Experience</Head>
          <Head>Actions</Head>

        </Row>
      

        {users.length >0 && users.map((item)=>(
       
          <Row key={item._id}>
             <Data><Profile src={item.profileImage}/></Data> 
              <Data><Desc>{item.name}</Desc></Data>
              <Data><Desc>{item.email}</Desc></Data>
              <Data><Desc>{item.experience}</Desc><Circle working={item.working}/></Data>
              <Data><Desc><Icon className='fa fa-trash' onClick={()=>{deleteUser(item._id)}}/></Desc></Data>
          </Row>

        ))
 
          } 
        </tbody>
      
      </Table>
      </ListContainer>
    </Container>


    <Modal visible={visible}>
     <ModalTitle>Add New Record</ModalTitle>
     <Form onSubmit={handleSumbit} encType='multipart/form-data'>
      <InputForm>
      <Detail>Email</Detail>

      <InputContainer>
      
      <Input name="email" onChange={(e)=>{checkEmail(e)}}/>
      </InputContainer>
      </InputForm>
      {emailError.length >0 && <Error>{emailError}</Error>}


      <InputForm>
      <Detail>Full Name</Detail>
      <InputContainer>
      <Input name="name" onChange={(e)=>{setName(e.target.value)}}/>
      </InputContainer>
      </InputForm>



      <InputForm>
      <Detail>Date Of Joining</Detail> 
      <InputContainer>
      <InputCalendar value={inputJoin} name="join"  onChange={(e)=>{setInputJoin(e.target.value)}}/>
      <CalendarIcon className='fa fa-calendar' onClick={()=>{setHidden1(!hidden1)}}></CalendarIcon>
      <CalendarDiv  hidden={hidden1}>
      <Calendar      
       value={joindate}
      onChange={setJoinDate}
      shouldHighlightWeekends
      />
      </CalendarDiv>
      </InputContainer>
      </InputForm>

   
      <InputForm>
      <Detail>Date Of Leaving</Detail>
      <InputContainer>
      <InputCalendar  value={inputleave} name='leave' onChange={(e)=>{setInputleave(e.target.value)}}/>
      <CalendarIcon className='fa fa-calendar' onClick={()=>{setHidden2(!hidden2)}}></CalendarIcon>
      <CalendarDiv  hidden={hidden2}>
      <Calendar      
      value={leavedate}
      onChange={setLeaveDate}
      shouldHighlightWeekends
      
      />
      </CalendarDiv> 
      <InputCheck type='checkbox'  name='working' value={working} onChange={()=>{setWorking(!working)}}/>
      <CheckboxDesc>Still working</CheckboxDesc>
      </InputContainer>
      </InputForm>
    


      <InputForm>
      <Detail>Upload Image</Detail>
      <InputContainer>
      <CalendarIcon className="fa fa-upload"></CalendarIcon>
      <ChooseInput type="file" onChange={handleChange} name='profileImage' accept=".png, .jpg, .jpeg"/>
      </InputContainer>
      </InputForm>

     <Save type="submit">Save</Save>
     </Form>
    
    <Close onClick={()=>{setVisible(!visible)}}><CalendarIcon className="fa fa-close" style={{color:'#f6f6f6'}}/></Close>
    </Modal>

    </>
  )
}

export default UserPanel