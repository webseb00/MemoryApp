import React from 'react'
import { PostItem } from '../components'

const Home = () => {
  return (
    <div className="container px-2 sm:px-4 py-2.5 mx-auto">
      <div>
        <h2 className="text-center my-6">Latest memories...</h2>
      </div>
      <div className="grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <PostItem />
        <PostItem />
        <PostItem />
        <PostItem />
        <PostItem />
      </div>
    </div>
  )
}

export default Home