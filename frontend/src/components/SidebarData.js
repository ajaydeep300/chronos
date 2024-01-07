import React from 'react'
//import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';  
import * as IoIcons from 'react-icons/io';  

export const SidebarData = [
    {
         title:  'Home ',
         path: '/',
         icon: <AiIcons.AiFillHome />, 
         cName: 'sidebar-text'
    }, 
    {
        title:  'View Hours ',
        path: '/landing',
        icon: <IoIcons.IoIosPaper />, 
        cName: 'sidebar-text'
   }, 
   {
        title:  'Request Vacation',
        path: '/vacation',
        icon: <IoIcons.IoIosSunny />, 
        cName: 'sidebar-text' 
    }, 

    {
        title:  'Settings',
        path: '/settings',
        icon: <IoIcons.IoIosSettings/>, 
        cName: 'sidebar-text'
   }, 
]  