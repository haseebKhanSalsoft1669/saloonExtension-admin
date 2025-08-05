import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';

const QuillEditor = ({ value, onChange } : any) => {
  // const [value, setValue] = useState("");

  return (
    <div className="custom-textarea">
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        className="custom-textarea"
        placeholder="Write something amazing..."
        style={{border:"1px solid var(--border-color) !important, border-radius: 8px !important, overflow: hidden !important"}}
      />
    </div>
  );
};

export default QuillEditor;
