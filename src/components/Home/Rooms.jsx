import { useEffect, useState } from 'react'
import Card from './Card'
import Container from '../Shared/Container'
import Heading from '../Shared/Heading'
import LoadingSpinner from '../Shared/LoadingSpinner'
import useAxiosSecure from '../../hooks/useAxiosSecure'
import { useQuery } from '@tanstack/react-query'
import EmptyRoom from '../NoDataFound/EmptyRoom'
import { useSearchParams } from 'react-router-dom'

const Rooms = () => {
  // 3 get category in rooms
  const [params,setParams]=useSearchParams();
  const category=params.get("category")
  
  const axiosSecure=useAxiosSecure();
  const {data:rooms=[],isLoading}=useQuery({
    queryKey:['rooms',category],
    queryFn:async()=>{
      const {data}=await axiosSecure.get(`/rooms?category=${category}`);
      return data
    }
  })
  if (isLoading) return <LoadingSpinner />

  return (
    <Container>
      {rooms && rooms.length > 0 ? (
        <div className='pt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8'>
          {rooms.map(room => (
            <Card key={room._id} room={room} />
          ))}
        </div>
      ) : (
        <EmptyRoom></EmptyRoom>
      )}
    </Container>
  )
}

export default Rooms
