import React from "react";
import "./App.css";

// import sound from "./MusMus-JGL-017.mp3";
import sound from "./20210806_102244_222_radiohistory_ep0544.mp3";
const music = new Audio(sound);

const onClickPlay = () => {
  music.play();
  
}
const onClickStop = () => music.pause();
const onClickLoopTrue = () => {
  music.loop = true;
  console.log("ループあり");
};
const onClickLoopFalse = () => {
  music.loop = false;
  console.log("ループなし");
};
const onClickCurrentTime = () => (music.currentTime = 0);
const onClickEnded = () => {
  if (music.ended) {
    alert("再生終了");
  } else {
    alert("再生前or再生中");
  }
};

export const App = () => {
  return (
    <>
      <div className="wrap">
        <button onClick={onClickStop}>停止</button>
        <button onClick={onClickPlay}>再生</button>
        <button onClick={onClickLoopTrue}>ループ再生ON</button>
        <button onClick={onClickLoopFalse}>ループ再生OFF</button>
        <button onClick={onClickCurrentTime}>最初へ</button>
        <button onClick={onClickEnded}>再生終了確認</button>
      </div>
      <div id="app" className="app">
      <div id="audio_thumb">
        <img className="ep_img" src="https://storage.googleapis.com/propo-apollo.appspot.com/users/X4wgS1qpQSSvTW5FSTPgO9HyS8B2/channels/FEPdlmxIDrgN6wYk0EK0/images/radireki_thumbnail_280x280.jpg" width="160" height="160" alt="epi544" />
        <i id="play_ico" className="material-icons"  onClick={onClickPlay}>play_circle_outline</i>
        <i id="pause_ico" className="material-icons">pause_circle_outline</i>
      </div>
      <div id="audio_desc">
         
        
        
        
        <div className="ep-date">2021.08.10</div>
        <div className="ep-title">
          0544_イスラム教の六信五行から考える日本人にとっての「聖典」と「行動規範」<span className="sp-nodisp"></span>
        </div>
        <div id="timebar">
          <div id="timebar-bg">
            <div id="timebar-past">
              <div id="timebar-num">0%</div>
            </div>
          </div>
        </div>
        <div>
          <span id="time_disp">00:00:00/00:00:00</span>
          <p className="time_control_area">
            <span><img id="playback" src="https://propo.fm/image/rewind.png" width="23" alt="rewind" /></span>
            <span><img id="skip" src="https://propo.fm/image/skip.png" width="23" alt="skip" /></span>
            <span id="speed_ctrl">1.00x</span>
          </p>
        </div>
      </div>
      </div>
    </>
  );
};
