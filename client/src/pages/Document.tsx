import React, { useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const Document = () => {
    const [value, setValue] = useState('');
    return (
        <div>
            <ReactQuill
                theme="snow"
                value={value}
                onChange={setValue}
                placeholder="Write your document here..."
            />
            <div>
                <h3>Document Preview:</h3>
                <div dangerouslySetInnerHTML={{ __html: value }} className='text-left list-disc' />
            </div>
        </div>
    )
}

export default Document