"use client";
import React, { useEffect, useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import { python } from "@codemirror/lang-python";
import { dracula } from "@uiw/codemirror-theme-dracula";
import { githubLight } from "@uiw/codemirror-theme-github";

const languageExtensions = {
  javascript,
  html,
  css,
  python,
};

const CodeEditor = ({ file, onChange }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const extension = languageExtensions[file.language] || [];

  useEffect(() => {
    const checkDark = () =>
      document.documentElement.classList.contains("dark");
    document.firstElementChild.setAttribute('data-theme', theme.value)

    console.log("Dark mode check:", checkDark());

    setIsDarkMode(checkDark());

    const observer = new MutationObserver(() => {
      setIsDarkMode(checkDark());
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  const theme = isDarkMode ? dracula : githubLight;

  return (
    <div className="h-full w-full dark:background light:background p-2">
      <div className="text-sm text-gray-400 mb-1">
        Editing: <span className="font-medium">{file.name}</span>
      </div>
      <CodeMirror
        value={file.content}
        height="calc(100vh - 100px)"
        extensions={[extension()]}
        theme={theme}
        onChange={onChange}
      />
    </div>
  );
};

export default CodeEditor;
