import { useSession } from 'next-auth/react'
import React from 'react'
import Image from 'next/image'

type Props = {
  seed?: string
  large?: boolean
}

function Avatar({ seed, large }: Props) {
  const { data: session } = useSession()
  const url = `https://avatars.dicebear.com/api/adventurer/${
    seed || session?.user?.name || 'salamanderZeus'
  }mewt.svg`
  // console.log(url)
  return (
    <div
      className={`relative h-10 w-10 rounded-full border-gray-300 bg-white ${
        large && 'h-20 w-20'
      }`}
    >
      <Image src={url} layout="fill" />
    </div>
  )
}

export default Avatar
