// components/ui/SimpleRichTextEditor.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import Button from "@/components/ui/Button";
import AnimatedModalLayout from "../layout/animatedModalLayout";

interface SimpleRichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

const SimpleRichTextEditor: React.FC<SimpleRichTextEditorProps> = ({
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

  const formatText = (command: string) => {
    document.execCommand(command, false);
    handleInput();
    editorRef.current?.focus();
  };

  const getPlainTextLength = () => {
    return value.replace(/<[^>]*>/g, "").length;
  };

  const getWordCount = () => {
    const text = value.replace(/<[^>]*>/g, "");
    return text.trim() ? text.trim().split(/\s+/).length : 0;
  };

  const toolbarButtons = [
    { icon: "fas fa-bold", command: "bold", title: "Bold" },
    { icon: "fas fa-italic", command: "italic", title: "Italic" },
    { icon: "fas fa-underline", command: "underline", title: "Underline" },
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
  ];

  return (
    <>
      <div
        className={`border border-gray-600 rounded-lg bg-gray-700 ${className}`}
      >
        {/* Simplified Toolbar */}
        <div className="flex items-center gap-1 p-2 border-b border-gray-600 bg-gray-800 rounded-t-lg">
          {toolbarButtons.map((button) => (
            <button
              key={button.command}
              type="button"
              onClick={() => formatText(button.command)}
              disabled={disabled}
              className="w-8 h-8 flex items-center justify-center text-gray-300 hover:bg-gray-700 rounded transition-colors disabled:opacity-50"
              title={button.title}
            >
              <i className={`${button.icon} text-sm`}></i>
            </button>
          ))}

          {/* Preview Button */}
          <button
            type="button"
            onClick={() => setShowPreview(true)}
            disabled={disabled || !value}
            className="w-8 h-8 flex items-center justify-center text-blue-400 hover:bg-gray-700 rounded transition-colors disabled:opacity-50 ml-2"
            title="Preview Answer"
          >
            <i className="fas fa-eye text-sm"></i>
          </button>
        </div>

        {/* Editor Area with Placeholder */}
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

        {/* Simple Character Count */}
        <div className="p-2 border-t border-gray-600 bg-gray-800 rounded-b-lg text-xs text-gray-400">
          <div className="flex justify-between">
            <span>Characters: {getPlainTextLength()}</span>
            <span>Words: {getWordCount()}</span>
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      {showPreview && (
        <AnimatedModalLayout
          maxWidth={896}
          children={
            <div className="">
              <div className="bg-white rounded-xl shadow-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
                <div className="flex justify-between items-center p-6 border-b border-gray-200">
                  <h3 className="text-xl font-semibold text-gray-900">
                    Answer Preview
                  </h3>
                  <button
                    onClick={() => setShowPreview(false)}
                    className="text-gray-400 hover:text-gray-600 text-xl"
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>

                <div className="p-6 overflow-y-auto max-h-[60vh]">
                  <div className="bg-gray-50 rounded-lg p-6 min-h-[200px]">
                    {value ? (
                      <div
                        className="prose prose-lg max-w-none text-black"
                        dangerouslySetInnerHTML={{ __html: value }}
                      />
                    ) : (
                      <div className="text-gray-400 text-center py-8">
                        <i className="fas fa-edit text-4xl mb-4"></i>
                        <p>No content to preview yet.</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex justify-end p-6 border-t border-gray-200 bg-gray-50">
                  <Button
                    variant="primary"
                    onClick={() => setShowPreview(false)}
                  >
                    Close Preview
                  </Button>
                </div>
              </div>
            </div>
          }
        />
      )}
    </>
  );
};

export default SimpleRichTextEditor;
