import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactPlayer from 'react-player/youtube';
import { BsFillCheckCircleFill } from "react-icons/bs"
import { AiOutlineLike, AiOutlineDislike,AiOutlineDownload } from "react-icons/ai"
import { abbreviateNumber } from 'js-abbreviation-number';
import { fetchDataFromApi } from '../util/api';
import { Context } from '../context/contextApi';
import SuggestionVideo from './SuggestionVideo';

const VideoDetails = () => {
  const [video, setVideo] = useState();
  const [relatedVideos, setRelatedVideos] = useState();
  const { id } = useParams();
  const { setLoading } = useContext(Context);

  useEffect(() => {
    document.getElementById("root").classList.add("custom-h");
    fetchVideoDetails();
    fetchRelatedVideos();
  }, [id]);

  const fetchVideoDetails = () => {
    setLoading(true);
    fetchDataFromApi(`video/details/?id=${id}`).then((res) => {
      console.log(res);
      setVideo(res);
      setLoading(false);
    });
  };

  const fetchRelatedVideos = () => {
    setLoading(true);
    fetchDataFromApi(`video/related-contents/?id=${id}`).then((res) => {
      console.log(res);
      setRelatedVideos(res);
      setLoading(false);
    });
  };

  return (
    <div className="flex justify-center flex-row h-[calc(100%-56px)]  ">
      <div className="w-full max-w-[1280px] flex flex-col lg:flex-row">
        <div className="flex flex-col lg:w-[calc(100%-350px)] xl:w-[calc(100%-400px)] px-4 py-3 lg:py-6 overflow-y-auto">
          <div className="h-[300px] md:h-[400px] lg:h-[400px] xl:h-[550px] ml-[-16px] lg:ml-0 mr-[-16px] lg:mr-0">
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${id}`}
              controls
              width="100%"
              height="100%"
              style={{ backgroundColor: "#000000" }}
              playing={true}
            />
          </div>
          <div className="text-white font-bold text-[20px] md:text-xl mt-4 line-clamp-2">
            {video?.title}
          </div>
          <div className="flex justify-between flex-col  md:flex-row mt-4">
            <div className="flex">
              <div className="flex items-start">
                <div className="flex h-11 w-11 rounded-full overflow-hidden">
                  <img
                    className="h-full w-full object-cover"
                    src={video?.author?.avatar[0]?.url}
                  />
                </div>
              </div>
              <div className="flex flex-col ml-3">
                <div className="text-white text-md font-semibold flex items-center">
                  {video?.author?.title}
                  {video?.author?.badges[0]?.type ===
                    "OFFICIAL_ARTIST_CHANNEL" && (
                      <BsFillCheckCircleFill className="text-white/[0.5] text-[12px] ml-1" />
                    )}
                </div>
                <div className="text-white/[0.7] text-sm">
                  {video?.author?.stats?.subscribersText}
                </div>

              </div>
            </div>
            <div className="flex text-white mt-4 md:mt-2 hover:text-blue-700">
              <div className="flex items-center justify-center h-8 md:h-11 px-6 rounded-3xl bg-white/[0.15] cursor-pointer mr-5 ">
                <AiOutlineLike className=" text-xs md:text-xl text-white mr-2 hover:text-blue-700" />
                <span className=' text-xs md:text-[15px] text-white mr-2'>
                {`${abbreviateNumber(
                  video?.stats?.views,
                  2
                )}`}

                </span>
                <button className='pl-2 ml-2 border-l-2 border-l-white'><AiOutlineDislike className=" text-xs md:text-xl text-white  mr-2 hover:text-blue-700" /></button>
              </div>
                  <button className="flex items-center justify-center h-8 md:h-11 px-6 rounded-3xl bg-white/[0.15] cursor-pointer mr-5 text-xs md:text-[15px] text-white hover:text-blue-700"><AiOutlineDownload className='pr-2 text-xl md:text-3xl text-white '/> Download</button>
            </div>
          </div>
              <div className="w-[98%] ml-2 mt-4  bg-white/[0.15] p-3 rounded-2xl text-sm text-white/[0.7] ">
                <div className="flex items-center">

                <div className="flex items-center text-white/[0.7] text-sm  font-bold">
                  {`${abbreviateNumber(
                    video?.stats?.views,
                    2
                    )} Views`}
                </div><span className='flex text-[24px] leading-none font-extrabold relative top-[-5px] mx-1 items-center'>
                  .
                </span>
                <span className='font-bold'>

                {video?.publishedDate}
                </span>
                    </div>
                  <div className='h-[80px] lg:h-full  overflow-y-auto '>
                  <span >{video?.description}</span>
                  </div>
                  

              </div>
        </div>
        <div className="flex flex-col py-6 px-4 overflow-y-auto lg:w-[350px] xl:w-[400px]">
          {relatedVideos?.contents?.map((item, index) => {
            if (item?.type !== "video") return false;
            return (
              <SuggestionVideo
                key={index}
                video={item?.video}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default VideoDetails