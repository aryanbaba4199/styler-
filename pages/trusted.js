import dynamic from 'next/dynamic'
import {useState} from 'react'
import DOMPurify from 'dompurify';


const QuillNoSSRWrapper = dynamic(import('react-quill'), {
    ssr: false,
    loading: () => <p>Loading...</p>,
})

// quill modules definitions
//...

export default function articles() {
    const [text, setText] = useState(preData);

    function handleTextChange(content, delta, source, editor) {
        //let str = JSON.stringify(editor.getContents());
        //let parsed = JSON.parse(str)
        setText(editor.getContents());
        const cleaned = DOMPurify.sanitize(editor.getHTML());
        console.log('Cleaned Html: ', cleaned);

    return (
        <div className="quill_container">
            <div id="editor" className="editor">
                <QuillNoSSRWrapper
                    id="quilleditor"
                    modules={modules}
                    formats={formats}
                    theme="snow"
                    value={text}
                    onChange={handleTextChange}
                  />
             </div>
        </div>
    );
    }
};