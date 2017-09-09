import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Vrview from './vrview/VrviewCmp';
import {ISceneConfig} from "./vrview/interfaces/ISceneConfig";

const scene: ISceneConfig = {
  scene: {width: '90%', height: 400, image: '../images/coral.jpg', is_stereo: true, is_debug: true},
  hotspots: [
    {name: 'hotspot1', pitch: 0, yaw: -35, radius: 0.05, distance: 2, newScene: {
      scene: {image: '../images/landscape1.jpg', is_stereo: false},
      hotspots: [
        {name: 'hotspot3', pitch: 0, yaw: -35, radius: 0.05, distance: 2, newScene: {
          scene: {image: '../images/landscape2.jpg', is_stereo: false}}},
        {name: 'hotspot4', pitch: 0, yaw: 0, radius: 0.05, distance: 2, newScene: {
          scene: {image: '../images/landscape1.jpg', is_stereo: false}}}
      ]
    }},
    {name: 'hotspot2', pitch: 0, yaw: 0, radius: 0.05, distance: 2}
  ]
};

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Vrview {...scene} />, div);
});
