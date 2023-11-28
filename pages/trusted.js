import dynamic from 'next/dynamic';
import { useState } from 'react';
import DOMPurify from 'dompurify';

const QuillNoSSRWrapper = dynamic(import('react-quill'), {
    ssr: false,
    loading: () => <p>Loading...</p>,
});


export default function Articles() {
    const [text, setText] = useState(preData);

    function handleTextChange(content, delta, source, editor) {
        setText(editor.getContents());
        const cleaned = DOMPurify.sanitize(editor.getHTML());
        console.log('Cleaned Html: ', cleaned);
    }

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
