"use client";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import {
  ClassicEditor,
  Bold,
  Essentials,
  Italic,
  Mention,
  Paragraph,
  Underline,
  Strikethrough,
  List,
  Undo,
  FontColor,
  FontBackgroundColor,
  Heading,
  Link,
  BlockQuote,
  Alignment,
} from "ckeditor5";

import "ckeditor5/ckeditor5.css";
import { ErrorMessage } from "formik";

interface Props {
  name: string;
  placeholder: string;
  handleChange: any;
  value?: string;
}

const CustomEditor: React.FC<Props> = ({
  handleChange,
  name,
  placeholder,
  value = "",
}) => {
  return (
    <div className="flex flex-col w-full gap-y-3">
      <CKEditor
        editor={ClassicEditor}
        onChange={(_, e) => handleChange(name, e.getData())}
        data={value}
        config={{
          toolbar: {
            items: [
              "heading",
              "bold",
              "italic",
              "underline",
              "strikethrough",
              "fontColor",
              "fontBackgroundColor",
              "link",
              "blockquote",
              "alignment",
              "bulletedList",
              "numberedList",
              "undo",
              "redo",
            ],
          },
          plugins: [
            Bold,
            Essentials,
            Italic,
            Mention,
            Paragraph,
            Underline,
            Strikethrough,
            List,
            Undo,
            FontColor,
            FontBackgroundColor,
            Heading,
            Link,
            BlockQuote,
            Alignment,
          ],
          placeholder,
        }}
      />
      <ErrorMessage
        className="text-[10px] !mt-2 font-medium text-red-500"
        name={name}
        component="div"
      />
    </div>
  );
};

export default CustomEditor;
