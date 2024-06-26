import React from "react";

export const FileBase64 = (props) => {
  const handleChange = (e) => {
    let files = e.target.files;

      let allFiles = [];
      for (var i = 0; i < files.length; i++){

          let reader = new FileReader();
          let file = files[i];

          reader.readAsDataURL(file);

          reader.onload = () => {
            let fileInfo = {
              name: file.name,
              type: file.type,
              size: Math.round(file.size / 1000) + " kB",
              base64: reader.result,
              file: file,
            };

            allFiles.push(fileInfo);

            if (allFiles.length === files.length) {
              if (props.multiple) props.onDone(allFiles);
              else props.onDone(allFiles[0]);
            }
          };
      }
    };

  return (
      <input
          onChange={handleChange}
          multiple={props.multiple}
        id="file-upload"
        name="file-upload"
        type="file"
        className="sr-only"
      />
  );
};

FileBase64.defaultProps = {
  multiple: false,
};

// import React from 'react';

// export class FileBase64 extends React.Component {

//   constructor(props) {
//     super(props);
//     this.state = {
//       files: [],
//     };
//   }

//   handleChange(e) {

//     // get the files
//     let files = e.target.files;

//     // Process each file
//     var allFiles = [];
//     for (var i = 0; i < files.length; i++) {

//       let file = files[i];

//       // Make new FileReader
//       let reader = new FileReader();

//       // Convert the file to base64 text
//       reader.readAsDataURL(file);

//       // on reader load somthing...
//       reader.onload = () => {

//         // Make a fileInfo Object
//         let fileInfo = {
//           name: file.name,
//           type: file.type,
//           size: Math.round(file.size / 1000) + ' kB',
//           base64: reader.result,
//           file: file,
//         };

//         // Push it to the state
//         allFiles.push(fileInfo);

//         // If all files have been proceed
//         if(allFiles.length == files.length){
//           // Apply Callback function
//           if(this.props.multiple) this.props.onDone(allFiles);
//           else this.props.onDone(allFiles[0]);
//         }

//       } // reader.onload

//     } // for

//   }

//   render() {
//     return (
//       <input
//         type="file"
//         onChange={ this.handleChange.bind(this) }
//         multiple={ this.props.multiple } />
//     );
//   }
// }

// FileBase64.defaultProps = {
//   multiple: false,
// };
