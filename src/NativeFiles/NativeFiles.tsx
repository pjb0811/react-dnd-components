import * as React from 'react';
import { DropTargetMonitor } from 'react-dnd';
import { NativeTypes } from 'react-dnd-html5-backend';
import TargetBox from './TargetBox';

export interface ContainerState {
  droppedFiles: any[];
}

class Container extends React.Component<{}, ContainerState> {
  constructor(props: {}) {
    super(props);
    this.handleFileDrop = this.handleFileDrop.bind(this);
    this.state = { droppedFiles: [] };
  }

  render() {
    const { FILE } = NativeTypes;
    const { droppedFiles } = this.state;

    return (
      <div>
        <TargetBox
          accepts={[FILE]}
          droppedFiles={droppedFiles}
          onDrop={this.handleFileDrop}
        />
      </div>
    );
  }

  handleFileDrop(_item: any, monitor: DropTargetMonitor) {
    if (monitor) {
      const droppedFiles = monitor.getItem().files;
      this.setState({ droppedFiles });
    }
  }
}

export default Container;