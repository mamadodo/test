import React from "react";
import "./App.css";

import sound from "./MusMus-JGL-017.mp3";
const music = new Audio(sound);

const onClickPlay = () => music.play();
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
    </>
  );
};
