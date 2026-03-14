import Editor from "@monaco-editor/react";

function CodeEditor({ code, setCode }) {

  const handleEditorChange = (value) => {
    setCode(value);
  };

  return (
    <div style={{ height: "400px", borderRadius: "10px", overflow: "hidden" }}>
      <Editor
        height="100%"
        defaultLanguage="javascript"
        value={code}
        theme="vs-dark"
        onChange={handleEditorChange}
        options={{
          fontSize: 14,
          minimap: { enabled: false },
          automaticLayout: true,
        }}
      />
    </div>
  );
}

export default CodeEditor;