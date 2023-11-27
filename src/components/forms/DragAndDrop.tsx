import React, {ChangeEvent, useState} from 'react';
import {FileUpload} from "@/assets/icons/FileUpload";
import Svg from "@/components/Svg";

const DragAndDrop:  React.FC<IDragAndDropProps> = ({filesUploaded}) => {
    const [isDragging, setIsDragging] = useState(false);

    const handleDragEnter = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault()
        setIsDragging(true);
    };

    const setUploadedFile = (event: React.ChangeEvent<HTMLInputElement> | React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();

        let files = null
        if (event.type === 'change') {
            const inputEvent = event as React.ChangeEvent<HTMLInputElement>;
            files = inputEvent.target.files;
        } else if (event.type === 'drop') {
            const dropEvent = event as React.DragEvent<HTMLDivElement>;
            files = dropEvent.dataTransfer.files;
        }

        if (filesUploaded && files) filesUploaded(files);
    };


    const handleDragLeave = () => {
        setIsDragging(false);
    };


    return (
        <div className="flex flex-col">
            <div
                className={`flex justify-center rounded-lg border border-dashed ${isDragging ? 'border-purple-900' : 'border-gray-100'} border-2 px-6 py-10`}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={(e) => e.preventDefault()}
                onDrop={setUploadedFile}
            >
                <div className="text-center">
                    <Svg fill="#652D90" path={FileUpload} customClasses="mx-auto h-2 w-12" />
                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                        <label
                            htmlFor="file-upload"
                            className="relative cursor-pointer rounded-md bg-white"
                        >
                            <span>Drag & Drop or <span className="font-semibold text-purple-900">Choose file</span> to upload</span>
                            <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={setUploadedFile} />
                        </label>
                    </div>
                    <p className="text-xs leading-5 text-gray-600">Max file size: <span className="font-semibold">5mb</span>. Supports: pdf, csv.</p>
                </div>
            </div>
        </div>
    );
};

export default DragAndDrop;
