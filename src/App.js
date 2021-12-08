import React, { useEffect, useRef, useState } from "react";
import "./App.css";

// import sound from "./MusMus-JGL-017.mp3";
import episode from "./20210806_102244_222_radiohistory_ep0544.mp3";
import episodeImg from "./radireki_thumbnail.jpeg";

const track = {
  date: "2021.08.10",
  title: "0544_イスラム教の六信五行から考える日本人にとっての「聖典」と「行動規範」",
  thumbnail: episodeImg,
  epiNum: "epi544",
}


export const App = () => {
  const musicRef = useRef(new Audio(episode));
  const intervalRef = useRef(null);
  // console.log(musicRef);
  // console.log(musicRef.current.duration);
  // console.log(isNaN(musicRef.current.duration));
  const [mDuration, setMDuration] = useState();

  useEffect(() => {
    const dTimer = setTimeout(() => {
      setMDuration(musicRef.current.duration)
      console.log(mDuration);
    }, 500);
    return () => clearTimeout(dTimer);
  }, [mDuration])
  
  const timeBar = useRef(null);
  let timeBarWidth;
  let timeBarX;

  const [isPlay, setIsPlay] = useState(false); // playing state
  const [timePosition, setTimePosition] = useState(0); // time position
  // const [timeRate, setTimeRate] = useState(0); // time position

  const speed = [1.0, 1.3, 1.5, 2.0, 0.5, 0.7];
  const [speedIndex, setSpeedIndex] = useState(0);
  const [speedNextIndex, setSpeedNextIndex] = useState(1);
  console.log(speedIndex + "初期値");
  
  const musicTime = (time) => {
    let hour = (Math.floor(time / 60 / 60)).toString().padStart( 2, '0');
    let minutes = (Math.floor((time / 60) % 60)).toString().padStart( 2, '0');
    let sec = (Math.floor(time % 60)).toString().padStart( 2, '0');
    let convertTime;
    convertTime = hour + ':' + minutes + ':' + sec;
    return convertTime;
  }

  const start = () => {
    if (intervalRef.current !== null) {
      return;
    }
    intervalRef.current = setInterval(() => {
      setTimePosition(musicRef.current.currentTime);
      // setTimeRate(timePosition / musicRef.current.currentTime);
    }, 1000);
  }

  const musicCurrentTime = musicRef.current.currentTime;
  const musicRate = (Math.floor(musicCurrentTime / mDuration * 100));
  console.log(musicRate);
  // play button
  const onClickTogglePlay = () => {
    if (isPlay === false) {
      musicRef.current.play();
      setIsPlay(!isPlay);
      console.log(isPlay);
      start();
    } else {
      musicRef.current.pause();
      setIsPlay(!isPlay);
      console.log(isPlay);
    }
  }

  // prev 15s
  const onClickBack = () => {
    console.log("playback");
    musicRef.current.currentTime -= 15;
  }

  // next 30s
  const onClickSkip = () => {
    console.log("playskip");
    musicRef.current.currentTime += 30;
  }


  // timebar click
  const onClickTime = (e) => {
    timeBarWidth = e.target.getBoundingClientRect().width;
    timeBarX = e.nativeEvent.offsetX;
    console.log(e.target.getBoundingClientRect().width);
    console.log(e.nativeEvent.offsetX);
    musicRef.current.currentTime = (timeBarX / timeBarWidth * mDuration);
  }

  // speed change
  const onClickChangeSpeed = () => {
    if (speedIndex === speed.length - 1) {
      setSpeedIndex(0);
      setSpeedNextIndex(speedNextIndex + 1);
    } else {
      setSpeedIndex(speedIndex + 1);
      if (speedNextIndex === speed.length - 1) {
        setSpeedNextIndex(0);
      } else {
        setSpeedNextIndex(speedNextIndex + 1);
      }
    }
    musicRef.current.playbackRate = speed[speedNextIndex];
    console.log(speedIndex);
    console.log(speedNextIndex + 'next');
  }

  return (
    <>
      <div id="app" className="app">
      <div id="audio_thumb" onClick={onClickTogglePlay}>
        <img className="ep_img" src={track.thumbnail} width="160" height="160" alt={track.epiNum} />

        {isPlay? 
          (
            <i id="pause_ico" className="material-icons">pause_circle_outline</i>
          ) : (
            <i id="play_ico" className="material-icons">play_circle_outline</i>
          )
        }

      </div>
      <div id="audio_desc">
        <div className="ep-date">{track.date}</div>
        <div className="ep-title">
          {track.title}<span className="sp-nodisp"></span>
        </div>
        <div id="timebar">
          <div id="timebar-bg" onClick={onClickTime} ref={timeBar}>
            <div id="timebar-past" style={{width: musicRate + '%'}}>
              <div id="timebar-num">{musicRate + '%'}</div>
            </div>
          </div>
        </div>
        <div>
          <span id="time_disp">
          {musicTime(timePosition)}/
          {musicTime(musicRef.current.duration)}
          </span>
          <p className="time_control_area">
            <span>
              <img 
                id="playback" 
                src="https://propo.fm/image/rewind.png" 
                width="23" 
                alt="rewind" 
                onClick={onClickBack}
              />
            </span>
            <span>
              <img 
                id="skip" 
                src="https://propo.fm/image/skip.png" 
                width="23" 
                alt="skip"
                onClick={onClickSkip}
              />
            </span>
            <span id="speed_ctrl" onClick={onClickChangeSpeed}>{speed[speedIndex].toFixed(1)}x</span>
          </p>
        </div>
      </div>
      </div>
    </>
  );
};
