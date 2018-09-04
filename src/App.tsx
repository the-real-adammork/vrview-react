import * as React from 'react';
import Vrview from './vrview/VrviewCmp';
import {IScene} from "./vrview/interfaces/IScene";
import ScenesCollection from "./scenes/Scenes";
import './App.css';


export class App extends React.PureComponent<{}, IScene> {

  // Collection of scenes
  private scenes: ScenesCollection = new ScenesCollection();

  // Initial state contains first scene of the collection
  public state: IScene = this.scenes.getSceneByArrayIndex(0);

  // Reference to Vrview Component to invoke some of its member methods
  private vrviewCmp: Vrview;

  /**
   * Load new scene when clicking a hotspot
   * @param idScene {number | string} Id new scene to load
   */
  handleClickHotspot = (idScene: number | string): void => {
    const newSceneObj = this.scenes.findSceneBydId(idScene) as IScene;
    if(!newSceneObj){
      alert('No scene found for id: ' + idScene);
      return;
    }
    this.vrviewCmp.showLoader();
    if(!newSceneObj.hotspots){
      this.setState({scene: newSceneObj.scene, hotspots: undefined});
    } else {
      this.setState({scene: newSceneObj.scene, hotspots: newSceneObj.hotspots});
    }
  };

  render(){

    const {scene} = this.state;

    return(

          <Vrview {...this.state}
            ref={ (vrview: Vrview) => {this.vrviewCmp = vrview} }
            onClickHotspot={ this.handleClickHotspot }
          />
    )
  }
}