"use client";
import React, { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import { load as cocoSSDLoad } from "@tensorflow-models/coco-ssd";
import * as tf from "@tensorflow/tfjs";
import { renderPredictions } from "@/utils/renderPredictions";

let detectInterval;

const ObjectDetectin = () => {
  const webCamRef = useRef(null);
  const canvasRef = useRef(null);
  const [loading, setLoading] = useState(false);


  const handleVideoDimention = () => {
    // ? Without explicitly setting the dimensions, the browser might scale the video to fit its container, which could result in undesirable visual artifacts or quality degradation. Setting the dimensions to the video’s natural size ensures it’s displayed as intended without any scaling.

    const webCamSelection = webCamRef.current.video;

    if (webCamRef.current !== null && webCamSelection?.readyState === 4) {
      const videoHeight = webCamSelection.videoHeight;
      const videoWidth = webCamSelection.videoWidth;

      webCamSelection.height = videoHeight;
      webCamSelection.width = videoWidth;
    }
  };

  const handleCoco = async () => {
    setLoading(true);
    const net = await cocoSSDLoad();
    setLoading(false);

    detectInterval = setInterval(() => {
      runObjectDetection(net);
    }, 10);
  };

  async function runObjectDetection(net) {
    if (
      canvasRef.current &&
      webCamRef.current !== null &&
      webCamRef.current.video?.readyState === 4
    ) {
      canvasRef.current.width = webCamRef.current.video.videoWidth;
      canvasRef.current.height = webCamRef.current.video.videoHeight;
    
      //TODO find all the detected objects

      const dectedObjects = await net.detect(webCamRef.current.video , undefined , 0.6)

      console.log(dectedObjects);
      const context = canvasRef.current.getContext("2d")
      renderPredictions(dectedObjects , context)
    }
  }

  useEffect(() => {
    handleVideoDimention();
    handleCoco();
  }, []);

  return (
      loading ? (
        <div>Loading AI model</div>
      ) : (
        <div className="flex justify-center items-center p-2 rounded-md relative">
          <Webcam ref={webCamRef} className="rounded-md" muted />
          <canvas
            ref={canvasRef}
            className="absolute top-0 left-0 z-[9999] rounded-md"
            muted
          />
        </div>
      )
  );
};

export default ObjectDetectin;
