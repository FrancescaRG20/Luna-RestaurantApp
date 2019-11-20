import React, { useEffect } from 'react'
import { connect, useSelector } from 'react-redux'

export default WrapperComponent => {
  const AuthComponent = (props)=> {
    const {authenticated} = useSelector(state=>state.userLoginReducer)

    const redirect = () => {
      if (!authenticated) {
          console.log()
        props.history.push('/login')
      }
    };

    useEffect( ()=> redirect(), [])

    return (<WrapperComponent { ...props }/>)
  }
  return connect()(AuthComponent)
}