import React, { Component } from 'react';
import Dropzone from 'react-dropzone';

const dropzoneStyle={
    background: "#f5f5f5",
    border: "1px dashed #c2c2c2",
    borderRadius: "3px",
    textAlign: "center",
    padding: "26px",
    fontFamily: "Montserrat, sans-serif",
    fontSize: "12px",
    fontWeight: "600"
};

const thumbsContainer={
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 16
}

const thumb={
    display: 'inline-flex',
    borderRadius: 2,
    border: '1px solid #eaeaea',
    marginBottom: 8,
    marginRight: 8,
    width: 100,
    height: 100,
    padding: 4,
    boxSizing: 'border-box'
};

const thumbInner={
    display: 'flex',
    minWidth: 0,
    overflow: 'hidden'
};

const img={
    display: 'block',
    width: 'auto',
    height: '100%'
};

const maxImageSize=5242880;
const minImageSize=0;
const acceptableFileTypes='image/x-png, impage/png, image/jpg, image/jpeg, image/gif';
const acceptedFileTypesArray=acceptableFileTypes.split(",").map((item) => { return item.trim() });

class ImgDrop extends Component {

    constructor(props) {
        super(props);
        this.state={
            imgSrc: null
        };
    }

    verifyFile=(files) => {
        if (files&&files.length>0) {
            // Assume 1 file dropped
            const theFile=files[0];
            const fileType=theFile.type;
            const fileSize=theFile.size;
            if (fileSize>maxImageSize) {
                alert("ERROR! The file you have chosen is too large.");
                alert("Please select a file no larger than "+maxImageSize+" bytes");
                return false;
            }
            if (!acceptedFileTypesArray.includes(fileType)) {
                alert("ERROR! The file you have is not of the correct type.");
                alert("Please select an image file of type jpg, jpeg, png, x-png, or gif");
                return false;
            }
            return true;
        }
    }

    handleOnDrop=(files, rejectedFiles) => {
        console.log("IN handleOnDrop");
        if (rejectedFiles&&rejectedFiles.length>0) {
            this.verifyFile(rejectedFiles);
        }
        if (files&&files.length>0) {
            if (this.verifyFile(files)) {
                // OK to show preview
                console.log("Image verified OK");
                const currentFile=files[0];
                const fileReader=new FileReader();
                fileReader.addEventListener("load", () => {
                    console.log(fileReader.result);
                    // update state
                    this.setState({
                        imgSrc: fileReader.result
                    });
                }, false);
                fileReader.readAsDataURL(currentFile);
            }
        }
    }

    render() {

        const { imgSrc }=this.state;
        // console.log("IMG src: ", imgSrc);

        return (
            <div>
                <Dropzone maxSize={maxImageSize}
                    minSize={minImageSize}
                    multiple={false}
                    onDrop={this.handleOnDrop}>
                    {({ getRootProps, getInputProps }) => (
                        <section className="container">
                            <div {...getRootProps({ className: 'dropzone' })}>
                                <input {...getInputProps()} />
                                <p style={dropzoneStyle}>Drag 'n' drop some files here, or click to select files</p>
                            </div>
                            <aside style={thumbsContainer}>
                                <div style={thumb} >
                                    <div style={thumbInner}>
                                        <img src={imgSrc} style={img} />
                                    </div>
                                </div>
                            </aside>
                        </section>
                    )}
                </Dropzone>

            </div>
        );
    }
}
export default ImgDrop;