import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import hljs from 'highlight.js';

const QuillEditor = () => {
  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ color: [] }, { background: [] }],
      ['link', 'image', 'video'],
      [{ 'code-block': 'code-block' }],
      [{ align: [] }],
      ['clean'],
    ],
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    },
    syntax: {
      highlight: (text) => hljs.highlightAuto(text).value,
    },
  };

  const quillFormats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'list',
    'bullet',
    'link',
    'image',
    'video',
    'code-block',
    'color',
    'align',
  ];

//   const handleImageUpload = (file) => {
//     const formData = new FormData();
//     formData.append('file', file);

    // Replace the URL with your own endpoint that can handle file uploads
//     fetch('https://myimageuploadserver.com/upload', {
//       method: 'POST',
//       body: formData,
//     })
//       .then((response) => response.json())
//       .then((result) => {
//         const url = result.url;
//         const editor = this.quill.getEditor();
//         const range = editor.getSelection(true);
//         const index = range.index + range.length;
//         editor.insertEmbed(index, 'image', url);
//       })
//       .catch((error) => console.error(error));
//   };

  return (
    <ReactQuill
     
      modules={quillModules}
      formats={quillFormats}
      placeholder="Write something amazing..."
      theme="snow"
    />
  );
};

export default QuillEditor;
