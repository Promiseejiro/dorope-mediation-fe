// components/ui/RichTextEditor.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import Button from "@/components/ui/Button";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value,
  onChange,
  placeholder = "Type your answer here...",
  disabled = false,
  className = "",
}) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [showPlaceholder, setShowPlaceholder] = useState(!value);
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    if (editorRef.current && value !== editorRef.current.innerHTML) {
      editorRef.current.innerHTML = value;
    }
    setShowPlaceholder(!value);
  }, [value]);

  const handleInput = () => {
    if (editorRef.current) {
      const content = editorRef.current.innerHTML;
      onChange(content);
      setShowPlaceholder(!content || content === "<br>");
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
    if (showPlaceholder && editorRef.current) {
      editorRef.current.innerHTML = "";
      setShowPlaceholder(false);
    }
  };

  const handleBlur = () => {
    setIsFocused(false);
    if (
      editorRef.current &&
      (!editorRef.current.innerHTML || editorRef.current.innerHTML === "<br>")
    ) {
      setShowPlaceholder(true);
      editorRef.current.innerHTML = "";
    }
  };

  const formatText = (command: string, value: string = "") => {
    document.execCommand(command, false, value);
    handleInput();
    editorRef.current?.focus();
  };

  const handleLinkInsert = () => {
    const url = prompt("Enter URL:");
    if (url) {
      formatText("createLink", url);
    }
  };

  const clearFormatting = () => {
    formatText("removeFormat");
    formatText("unlink");
  };

  const toolbarButtons = [
    {
      icon: "fas fa-bold",
      command: "bold",
      title: "Bold",
    },
    {
      icon: "fas fa-italic",
      command: "italic",
      title: "Italic",
    },
    {
      icon: "fas fa-underline",
      command: "underline",
      title: "Underline",
    },
    {
      icon: "fas fa-list-ul",
      command: "insertUnorderedList",
      title: "Bullet List",
    },
    {
      icon: "fas fa-list-ol",
      command: "insertOrderedList",
      title: "Numbered List",
    },
    {
      icon: "fas fa-link",
      command: "createLink",
      title: "Insert Link",
    },
  ];

  const getPlainTextLength = () => {
    return value.replace(/<[^>]*>/g, "").length;
  };

  const getWordCount = () => {
    const text = value.replace(/<[^>]*>/g, "");
    return text.trim() ? text.trim().split(/\s+/).length : 0;
  };

  return (
    <>
      <div
        className={`border border-gray-600 rounded-lg bg-gray-700 ${className}`}
      >
        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-1 p-3 border-b border-gray-600 bg-gray-800 rounded-t-lg">
          {toolbarButtons.map((button) => (
            <button
              key={button.command}
              type="button"
              onClick={() =>
                button.command === "createLink"
                  ? handleLinkInsert()
                  : formatText(button.command as any)
              }
              disabled={disabled}
              className="w-8 h-8 flex items-center justify-center text-gray-300 hover:bg-gray-700 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              title={button.title}
            >
              <i className={button.icon}></i>
            </button>
          ))}

          {/* Text Color */}
          <div className="flex items-center ml-2">
            <label className="text-xs text-gray-400 mr-2">Color:</label>
            <input
              type="color"
              onChange={(e) =>
                formatText("styleWithCSS", `color: ${e.target.value}`)
              }
              disabled={disabled}
              className="w-6 h-6 cursor-pointer disabled:opacity-50"
            />
          </div>

          {/* Clear Formatting */}
          <button
            type="button"
            onClick={clearFormatting}
            disabled={disabled}
            className="w-8 h-8 flex items-center justify-center text-gray-300 hover:bg-gray-700 rounded transition-colors disabled:opacity-50 ml-2"
            title="Clear Formatting"
          >
            <i className="fas fa-eraser"></i>
          </button>

          {/* Preview Button */}
          <button
            type="button"
            onClick={() => setShowPreview(true)}
            disabled={disabled || !value}
            className="w-8 h-8 flex items-center justify-center text-blue-400 hover:bg-gray-700 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed ml-2"
            title="Preview Answer"
          >
            <i className="fas fa-eye"></i>
          </button>
        </div>

        {/* Editor Area */}
        <div className="relative">
          <div
            ref={editorRef}
            contentEditable={!disabled}
            onInput={handleInput}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className={`min-h-48 p-4 text-white focus:outline-none transition-colors ${
              isFocused ? "ring-2 ring-primary ring-opacity-50" : ""
            } ${disabled ? "bg-gray-800 cursor-not-allowed" : "bg-gray-700"}`}
            style={{
              minHeight: "12rem",
              maxHeight: "24rem",
              overflowY: "auto",
            }}
            suppressContentEditableWarning={true}
          />

          {/* Placeholder */}
          {showPlaceholder && !isFocused && (
            <div className="absolute top-4 left-4 text-gray-400 pointer-events-none">
              {placeholder}
            </div>
          )}
        </div>

        {/* Character Count & Formatting Help */}
        <div className="flex justify-between items-center p-3 border-t border-gray-600 bg-gray-800 rounded-b-lg text-xs text-gray-400">
          <div className="flex items-center space-x-4">
            <span>Characters: {getPlainTextLength()}</span>
            <span>Words: {getWordCount()}</span>
            {getPlainTextLength() > 1000 && (
              <span className="text-yellow-400">
                (Long answer - consider being concise)
              </span>
            )}
          </div>
          <div className="flex items-center space-x-4">
            <span>Ctrl+B: Bold</span>
            <span>Ctrl+I: Italic</span>
            <span>Ctrl+U: Underline</span>
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <div>
                <h3 className="text-xl font-semibold text-gray-900">
                  Answer Preview
                </h3>
                <p className="text-gray-600 text-sm mt-1">
                  This is how your answer will appear to the examiner
                </p>
              </div>
              <button
                onClick={() => setShowPreview(false)}
                className="text-gray-400 hover:text-gray-600 text-xl"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>

            {/* Preview Content */}
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              <div className="bg-gray-50 rounded-lg p-6 min-h-[200px]">
                {value ? (
                  <div
                    className="prose prose-lg max-w-none"
                    dangerouslySetInnerHTML={{ __html: value }}
                  />
                ) : (
                  <div className="text-gray-400 text-center py-8">
                    <i className="fas fa-edit text-4xl mb-4"></i>
                    <p>No content to preview yet. Start typing your answer.</p>
                  </div>
                )}
              </div>

              {/* Statistics */}
              <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <p className="text-blue-600 font-semibold">
                    {getWordCount()}
                  </p>
                  <p className="text-gray-600">Words</p>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <p className="text-green-600 font-semibold">
                    {getPlainTextLength()}
                  </p>
                  <p className="text-gray-600">Characters</p>
                </div>
                <div className="text-center p-3 bg-purple-50 rounded-lg">
                  <p className="text-purple-600 font-semibold">
                    {Math.ceil(getWordCount() / 200)}
                  </p>
                  <p className="text-gray-600">Estimated Pages</p>
                </div>
                <div className="text-center p-3 bg-orange-50 rounded-lg">
                  <p className="text-orange-600 font-semibold">
                    {Math.ceil(getWordCount() / 20)}
                  </p>
                  <p className="text-gray-600">Reading Time (mins)</p>
                </div>
              </div>

              {/* Formatting Check */}
              <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <h4 className="font-semibold text-yellow-800 mb-2 flex items-center">
                  <i className="fas fa-lightbulb mr-2"></i>
                  Formatting Tips
                </h4>
                <ul className="text-sm text-yellow-700 space-y-1">
                  <li>
                    • Check that your answer is well-structured with paragraphs
                  </li>
                  <li>
                    • Ensure important points are emphasized with bold or italic
                    text
                  </li>
                  <li>• Verify that lists are properly formatted</li>
                  <li>
                    • Make sure your answer addresses all parts of the question
                  </li>
                </ul>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end space-x-3 p-6 border-t border-gray-200 bg-gray-50">
              <Button variant="outline" onClick={() => setShowPreview(false)}>
                Close Preview
              </Button>
              <Button variant="primary" onClick={() => setShowPreview(false)}>
                <i className="fas fa-edit mr-2"></i>
                Continue Editing
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RichTextEditor;
