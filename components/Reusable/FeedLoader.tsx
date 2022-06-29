import { Card, CardContent, CardHeader, Skeleton } from '@mui/material'
import React from 'react'
import { BiUpvote, BiDownvote } from 'react-icons/bi'
function FeedLoader() {
  return (
    <Card className="my-4 flex h-max min-h-[250px] border-[1px] border-[#cccccc] shadow-none">
      <div className="h-full w-[8%]">
        <div className="space-y-4 p-2 pt-5 text-upvote">
          <BiUpvote />
          <BiDownvote />
        </div>
      </div>
      <div className="flex flex-1 flex-col">
        <CardHeader
          className="pl-0"
          avatar={
            <Skeleton
              sx={{ bgcolor: 'grey.100' }}
              animation="wave"
              variant="circular"
              width={40}
              height={40}
            />
          }
          title={
            <Skeleton
              sx={{ bgcolor: 'grey.100' }}
              className="w-[40%]"
              animation="wave"
              height={20}
              style={{ marginBottom: 2 }}
            />
          }
          subheader={
            <Skeleton
              sx={{ bgcolor: 'grey.100' }}
              animation="wave"
              height={30}
              width="70%"
            />
          }
        />
        {
          <Skeleton
            sx={{ bgcolor: 'grey.100', height: 190 }}
            animation="wave"
            variant="rectangular"
          />
        }
        <div className="p-2 pl-0">
          {
            <div className="flex  justify-start space-x-3">
              <Skeleton
                sx={{ bgcolor: 'grey.100' }}
                className="w-[20%]"
                animation="wave"
                height={30}
                style={{ marginBottom: 6 }}
              />
              <Skeleton
                sx={{ bgcolor: 'grey.100' }}
                className="w-[5%]"
                animation="wave"
                height={30}
              />
            </div>
          }
        </div>
      </div>
    </Card>
  )
}

export default FeedLoader
