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
  Image,
  ImageCaption,
  ImageStyle,
  ImageToolbar,
  ImageUpload,
  ImageResize,
  LinkImage,
} from "ckeditor5";

import "ckeditor5/ckeditor5.css";
import { ErrorMessage } from "formik";
import { uploadToCloudinary } from "@/lib/cloudinary";

interface Props {
  name: string;
  placeholder: string;
  handleChange: any;
  value?: string;
}

// Custom upload adapter for Cloudinary
class CloudinaryUploadAdapter {
  loader: any;

  constructor(loader: any) {
    this.loader = loader;
  }

  upload() {
    return this.loader.file.then((file: File) => {
      return new Promise((resolve, reject) => {
        uploadToCloudinary(file)
          .then((url) => {
            resolve({
              default: url,
            });
          })
          .catch((error) => {
            reject(error);
          });
      });
    });
  }

  abort() {
    // Reject the promise returned from the upload() method.
  }
}

function CloudinaryUploadAdapterPlugin(editor: any) {
  editor.plugins.get("FileRepository").createUploadAdapter = (loader: any) => {
    return new CloudinaryUploadAdapter(loader);
  };
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
              "imageUpload",
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
            Image,
            ImageCaption,
            ImageStyle,
            ImageToolbar,
            ImageUpload,
            ImageResize,
            LinkImage,
            CloudinaryUploadAdapterPlugin,
          ],
          image: {
            toolbar: [
              "imageStyle:inline",
              "imageStyle:block",
              "imageStyle:side",
              "|",
              "toggleImageCaption",
              "imageTextAlternative",
              "|",
              "linkImage",
            ],
            styles: {
              options: [
              "full",
              "side",
              "alignLeft",
              "alignCenter",
              "alignRight",
            ]
          },
          },
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
