'use client'

import { useSelectedClipsContext } from '@/context/SelectedClipsContext'

const ProfilePage = () => {
  const { selectedClipsIds } = useSelectedClipsContext()
  console.log(selectedClipsIds)

  return (
    <div className="grid grid-cols-4 gap-5 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
      {/* {!clipsData.length ? (
        <p>Has no clips :(</p>
      ) : (
        clipsData.map((clip, index) => (
          <ClipItem
            key={clip.id}
            clip={clip}
            index={index}
            onClick={setClipIndex}
          />
        ))
      )} */}
      Profile
    </div>
  )
}

export default ProfilePage
