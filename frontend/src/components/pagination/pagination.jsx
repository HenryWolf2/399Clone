import logo from '../../assets/images/msh-loading.gif';
import '../../assets/styles/global.css';
import React, { Component } from "react";
import instance from '../api/api_instance.js'
import { Box, Pagination } from "@mui/material"
import { useState } from 'react';


export default function PostPagination(setPosts) {
  const [pageSize, setPageSize] = useState(10);
  const [paginationSize, setPaginationSize] = useState(0);

  const [pagination, setPagination] = useState ({
    count: 0,
    from: 0,
    to: pageSize
  })
  
  async function GetPublicPostsIDs() {
    try{ 
      await instance ({
        // Set URL to get all posts by ID
        url: "/post/get",
        method: "GET",

        // Not 100% what needs to go here but it needs to get all of the public
        // posts in an array I believe
        data: {post_id: setPosts.post_id}
        
    }).then((res) => {
      console.log(res)
      // Don't think this will work but it needs to be the size of the array
      setPaginationSize(res.data[0].length)
      
      // Unsure if this will work
      setPagination({ ...pagination, count: res.count })
      setPosts(res.data)
    });
    } catch(e) {
      console.error(e)
    }
  } 

  GetPublicPostsIDs()

  const handlePageChange = (event, page) => {
    const from = (page - 1 ) * pageSize;
    const to = (page -1 ) * pageSize + pageSize;

    setPagination({ ...pagination, from: from, to: to })
  }

  return (
    <Box justifyContent={"center"} allignItems="center" display={"flex"} sx = {{ margin: "20px 0px"}}>
      <Pagination 
        count = { Math.ceil(paginationSize / pageSize) }
        onChange={handlePageChange}
      />
    </Box>
  );
}
