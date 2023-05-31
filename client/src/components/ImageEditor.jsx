import FilerobotImageEditor, {
  TABS,
  TOOLS,
} from "react-filerobot-image-editor";
import { useDispatch } from "react-redux";
import { setLekiumImg } from "../../toolkit/slices/lekiumSlice";

const ImageEditor = ({ isImgEditorShown, closeImgEditor, src }) => {
  const dispatch = useDispatch();

  return (
    isImgEditorShown && (
      <FilerobotImageEditor
        source={src}
        onSave={(editedImageObject, designState) =>
          dispatch(setLekiumImg(editedImageObject.imageBase64))
        }
        onClose={closeImgEditor}
        annotationsCommon={{
          fill: "#ff0000",
        }}
        Text={{ text: "Filerobot..." }}
        Rotate={{ angle: 90, componentType: "slider" }}
        tabsIds={[TABS.ADJUST, TABS.ANNOTATE]} // or {['Adjust', 'Annotate', 'Watermark']}
        defaultTabId={TABS.ANNOTATE} // or 'Annotate'
        defaultToolId={TOOLS.TEXT} // or 'Text'
      />
    )
  );
};

export default ImageEditor;
