import * as React from 'react';

export interface FileListProps {
  files: any[];
}

class FileList extends React.Component<FileListProps> {
  render() {
    const { files } = this.props;
    if (files.length === 0) {
      return <div>Nothing to display</div>;
    }
    return <div>{this.list(files)}</div>;
  }

  list(files: any[]) {
    const label = (file: { size: string; name: string; type: string }) =>
      `'${file.name}' of size '${file.size}' and type '${file.type}'`;
    return files.map(file => <li key={file.name}>{label(file)}</li>);
  }
}

export default FileList;
