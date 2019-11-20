import React from 'react'
import {Route } from 'react-router-dom'
import ReviewsSubPage from '../SubPages/ReviewsSub'
import CommentsSubPage from '../SubPages/CommentsSub'
import EditProfileSubPage from '../SubPages/EditProfileSub'

const ProfileSubRoutes = (props) =>{
    return(
        <>
        <Route exact path='/profile/' component={ReviewsSubPage}/>
        <Route path='/profile/comments' component={CommentsSubPage}/>
        <Route path='/profile/edit' component={EditProfileSubPage}/>
        </>
        )
}

export default ProfileSubRoutes