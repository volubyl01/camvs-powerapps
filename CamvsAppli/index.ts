import { IInputs, IOutputs } from "./generated/ManifestTypes";
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import WeatherComponent from './components/WeatherComponent';
export class CamvsAppli implements ComponentFramework.StandardControl<IInputs, IOutputs> {
  private container: HTMLDivElement;
  private notifyOutputChanged: () => void;

  constructor() {
    console.log("CamvsAppli constructor called");
  }

  public init(
    context: ComponentFramework.Context<IInputs>,
    notifyOutputChanged: () => void,
    state: ComponentFramework.Dictionary,
    container: HTMLDivElement
  ): void {
    console.log("Component initialized", { context, state, container });
    this.container = container;
    this.notifyOutputChanged = notifyOutputChanged;
  }

  public updateView(context: ComponentFramework.Context<IInputs>): void {
    console.log("updateView called", { context, container: this.container });
    if (this.container instanceof HTMLElement) {
      this.container.style.maxWidth = '640px';
      this.container.style.maxHeight = '95px';
      this.container.style.border = '1px solid white';
      try {
        ReactDOM.render(
          React.createElement(
            React.StrictMode,
            null,
            React.createElement(WeatherComponent, {
              lat: 50.2788,
              lon: 3.9727
            })
          ),
          this.container
        );
        console.log("React component rendered successfully");
      } catch (error) {
        console.error("Error rendering React component:", error);
      }
    } else {
      console.error('Container is not a valid DOM element in updateView');
    }
  }
  

  public getOutputs(): IOutputs {
    console.log("getOutputs called");
    return {};
  }

  public destroy(): void {
    console.log("destroy called");
    try {
      ReactDOM.unmountComponentAtNode(this.container);
      console.log("React component unmounted successfully");
    } catch (error) {
      console.error("Error unmounting React component:", error);
    }
  }
}
