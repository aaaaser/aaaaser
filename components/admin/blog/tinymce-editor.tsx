"use client";

import React, { useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useTheme } from "@/components/theme-provider";
import { Loader2, Info } from "lucide-react";

interface TinyMceEditorProps {
  value: string;
  onChange: (content: string) => void;
  disabled?: boolean;
}

export function TinyMceEditor({ value, onChange, disabled = false }: TinyMceEditorProps) {
  const { resolvedTheme } = useTheme();
  const [editorLoading, setEditorLoading] = useState(true);
  const editorRef = useRef<unknown>(null);

  const apiKey = process.env.NEXT_PUBLIC_TINYMCE_API_KEY || "";
  const apiKeyMissingNotice = !apiKey;

  const isDark = resolvedTheme === "dark";

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label htmlFor="tinymce-editor-area" className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 flex items-center gap-1.5">
          <span>Blog Body & Content (TinyMCE Rich Editor)</span>
        </label>
        <span className="text-[11px] font-mono text-neutral-400">
          WYSIWYG &bull; HTML Supported
        </span>
      </div>

      {apiKeyMissingNotice && (
        <div className="flex items-start gap-2 text-xs font-mono text-neutral-600 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-900 p-2.5 rounded-lg border border-neutral-200 dark:border-neutral-800">
          <Info className="size-4 text-neutral-500 shrink-0 mt-0.5" />
          <div>
            <span>TinyMCE aktif dalam mode open-source cloud. Untuk menghilangkan watermark lisensi di produksi, tambahkan </span>
            <code className="bg-neutral-200 dark:bg-neutral-800 px-1 py-0.5 rounded text-[11px] text-neutral-900 dark:text-neutral-100">
              NEXT_PUBLIC_TINYMCE_API_KEY
            </code>
            <span> pada file environment.</span>
          </div>
        </div>
      )}

      <div className="relative rounded-xl border border-neutral-200 dark:border-neutral-800 overflow-hidden bg-white dark:bg-neutral-950 min-h-[460px]">
        {editorLoading && (
          <div className="absolute inset-0 bg-neutral-50 dark:bg-neutral-900/80 backdrop-blur-xs flex flex-col items-center justify-center gap-2 z-10">
            <Loader2 className="size-6 animate-spin text-neutral-500" />
            <span className="text-xs font-mono text-neutral-500">Memuat TinyMCE Editor...</span>
          </div>
        )}

        <Editor
          id="tinymce-editor-area"
          apiKey={apiKey || "no-api-key"}
          onInit={(_evt, editor) => {
            editorRef.current = editor;
            setEditorLoading(false);
          }}
          value={value}
          onEditorChange={(newContent) => {
            onChange(newContent);
          }}
          disabled={disabled}
          init={{
            height: 500,
            menubar: true,
            plugins: [
              "advlist",
              "autolink",
              "lists",
              "link",
              "image",
              "charmap",
              "preview",
              "anchor",
              "searchreplace",
              "visualblocks",
              "code",
              "fullscreen",
              "insertdatetime",
              "media",
              "table",
              "help",
              "wordcount",
              "codesample",
            ],
            toolbar:
              "undo redo | blocks fontfamily fontsize | " +
              "bold italic underline strikethrough | link image media table | align lineheight | " +
              "bullist numlist blockquote codesample | " +
              "forecolor backcolor | removeformat | preview code fullscreen help",
            skin: isDark ? "oxide-dark" : "oxide",
            content_css: isDark ? "dark" : "default",
            content_style: `
              body { 
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; 
                font-size: 15px; 
                line-height: 1.7; 
                color: ${isDark ? "#e5e5e5" : "#171717"}; 
                background-color: ${isDark ? "#0a0a0a" : "#ffffff"};
                padding: 16px;
              }
              pre, code { font-family: 'JetBrains Mono', monospace; font-size: 13px; }
              blockquote { border-left: 3px solid ${isDark ? "#404040" : "#d4d4d4"}; padding-left: 14px; margin-left: 0; color: ${isDark ? "#a3a3a3" : "#525252"}; }
              img { max-width: 100%; height: auto; border-radius: 8px; }
              table { width: 100%; border-collapse: collapse; margin: 16px 0; }
              th, td { border: 1px solid ${isDark ? "#333" : "#e5e5e5"}; padding: 8px 12px; }
              th { background-color: ${isDark ? "#1f1f1f" : "#f5f5f5"}; }
            `,
            branding: false,
            statusbar: true,
            elementpath: true,
            image_title: true,
            automatic_uploads: true,
            file_picker_types: "image",
            images_upload_handler: async (blobInfo: { blob: () => Blob; filename: () => string }) => {
              try {
                const formData = new FormData();
                formData.append("file", blobInfo.blob(), blobInfo.filename());
                const res = await fetch("/api/upload", {
                  method: "POST",
                  body: formData,
                });
                const data = await res.json();
                if (!res.ok || !data.url) {
                  throw new Error(data.error || "Gagal mengunggah gambar ke editor");
                }
                return data.url;
              } catch (err: unknown) {
                const msg = err instanceof Error ? err.message : "Upload gagal";
                throw new Error(msg);
              }
            },
          }}
        />
      </div>
    </div>
  );
}
