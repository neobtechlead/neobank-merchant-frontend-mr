import { useState } from 'react';
import {FileUpload} from "../../../public/assets/icons/FileUpload";
import Svg from "@/components/Svg";

const DragAndDrop = () => {
    const [isDragging, setIsDragging] = useState(false);
    const [fileDropped, setFileDropped] = useState(false);

    const handleDragEnter = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);

        const files = e.dataTransfer.files;
        console.log(files);
    };

    return (
        <div className="flex flex-col">
            <div
                className={`flex justify-center rounded-lg border border-dashed ${isDragging ? 'border-purple-900' : 'border-gray-100'} border-2 px-6 py-10`}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
            >
                <div className="text-center">
                    <Svg fill="#652D90" path={FileUpload} customClasses="mx-auto h-2 w-12" />
                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                        <label
                            htmlFor="file-upload"
                            className="relative cursor-pointer rounded-md bg-white"
                        >
                            <span>Drag & Drop or <span className="font-semibold text-purple-900">Choose file</span> to upload</span>
                            <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={(e) => console.log(e.target.files)} />
                        </label>
                    </div>
                    <p className="text-xs leading-5 text-gray-600">Max file size: <span className="font-semibold">5mb</span>. Supports: pdf, csv.</p>
                </div>
            </div>
        </div>
    );
};

export default DragAndDrop;
