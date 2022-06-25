import React from 'react'
import styled from 'styled-components'

const Container=styled.div`
width:100%;
height:80px;
background-color:#08090a;
display:flex;
align-items:center;
`

const Title=styled.h2`
color:white;
font-family:'Poppins';
font-weight:600;
letter-spacing:3px;
flex:.3;
text-align:center;
`

const InnerContainer=styled.div`
flex:.7;
display:flex;
align-items:center;
justify-content:center;

`

const Input=styled.input`
border:none;
padding:5px 10px;
width:60%;
margin-right:14px;
outline:none;
border-radius:10px;
font-size:18px;
`

const Icon=styled.i`
font-size:22px;
color:#f6f6f6;

&:hover{
    transform:scale(1.2)
}
`




const Navbar = () => {

  return (
    <Container>
        <Title>ADMIN DASHBOARD</Title>
        <InnerContainer>
           <Input />
           <Icon className='fa fa-search'></Icon>
        </InnerContainer>
    </Container>
  )
}

export default Navbar