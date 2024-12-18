import React from 'react';
import { abbreviateNumber } from "js-abbreviation-number";
import { Link } from "react-router-dom";
import { BsFillCheckCircleFill } from "react-icons/bs"
import VideoLength from '../shared/VideoLength';

const VideoCard = ({ video }) => {
  return (
    <Link to={`/video/${video.videoId}`}>
      <div className="flex  flex-col mb-8">
        <div className='relative h-48 md:h-40 rounded-xl overflow-hidden'>

          <img
            className='h-full w-full object-cover'
            src={video?.thumbnails?.[0]?.url} alt="video"
          />
          {video?.lengthSeconds && (
            <VideoLength time={video?.lengthSeconds} length={video?.lengthSeconds} />
          )}
          
        </div>
        <div className='flex text-white mt-3'>
          <div className="flex items-start">
            <div className="flex h-9 w-9 rounded-full overflow-hidden">
              <img className='h-full w-full object-cover' src={video?.author?.avatar[0]?.url} />
            </div>
            <div className=" w-[280px] text-[12px] ml-2 font-bold overflow-hidden">
              {video?.title}
              <div className=" flex text-[12px] font-medium  text-gray-400">
                <span className='line-clamp-2 w-'>
                  {video?.author?.title}
                </span>
                <span className='items-center ml-1 flex'>

                  {video?.author?.badges[0]?.type === "OFFICIAL_ARTIST_CHANNEL" && (
                    <BsFillCheckCircleFill className='text-white/[0.4] text-[10px] ml-1' />
                  )}
                </span>
              </div>
              <div className=" text-[12px] font-medium  text-gray-400 truncate overflow-hidden flex">
                <span className='mr-1'>

                {`${abbreviateNumber(video?.stats?.views, 2)} views`}
                </span>
                <span className='flex text-[24px] leading-none font-extrabold relative top-[-10px] mx-1'>
                  .
                </span>
                <span className='truncate'>

                {video?.publishedTimeText}
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>


    </Link>
  )
}

export default VideoCard