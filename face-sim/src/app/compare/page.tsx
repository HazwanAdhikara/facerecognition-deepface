"use client";

import React, {
  useState,
  useRef,
  useEffect,
  DragEvent,
  ChangeEvent,
} from "react";
import Link from "next/link";
import { Layers, Code } from "lucide-react";
import { ThemeToggle } from "../../components/theme-toggle";

const AppHeader = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 max-w-screen-xl items-center justify-between px-4">
        <Link
          href="/"
          className="flex items-center gap-2"
          aria-label="Back to Homepage"
        >
          <Layers className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">CerminRupa</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/#features"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Features
          </Link>
          <Link
            href="#"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            About
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link
            href="/teams"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm hover:bg-accent hover:text-accent-foreground gap-1.5"
          >
            <Code className="h-4 w-4" />
            <span>Developers</span>
          </Link>
        </div>
      </div>
    </header>
  );
};

interface ImageUploadAreaProps {
  onImageSelect: (file: File) => void;
  previewUrl: string | null;
  labelText: string;
  inputId: string;
}

const ImageUploadArea: React.FC<ImageUploadAreaProps> = ({
  onImageSelect,
  previewUrl,
  labelText,
  inputId,
}) => {
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processFile = (file: File | null | undefined) => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    if (file && file.type.startsWith("image/")) {
      onImageSelect(file);
    } else if (file) {
      alert(
        "Please select an image file. Make sure the file type is an image (e.g., JPG, PNG)."
      );
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingOver(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingOver(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingOver(false);
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      processFile(files[0]);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      processFile(files[0]);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col items-center w-full">
      <label
        htmlFor={inputId}
        className="block mb-3 font-semibold text-lg text-center"
      >
        {labelText}
      </label>
      <div
        onClick={handleClick}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative w-full max-w-xs sm:max-w-sm md:w-72 h-72 bg-muted border-2 rounded-xl flex flex-col items-center justify-center cursor-pointer transition-all duration-150 ease-in-out group hover:border-accent
                    ${
                      isDraggingOver
                        ? "border-primary bg-accent scale-105"
                        : "border-border"
                    }`}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") handleClick();
        }}
        aria-label={`Upload ${labelText}`}
      >
        {previewUrl ? (
          <img
            src={previewUrl}
            alt={`${labelText} preview`}
            className="w-full h-full object-cover rounded-xl"
          />
        ) : (
          <div className="text-center text-muted-foreground p-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 mx-auto mb-3 text-muted-foreground"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
              />
            </svg>
            <p className="text-sm leading-tight">Drag and drop file</p>
            <p className="text-xs text-muted-foreground/70 my-1.5">or</p>
            <span className="text-sm font-medium text-primary group-hover:text-primary/80">
              Browse Files
            </span>
          </div>
        )}
        <input
          type="file"
          id={inputId}
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*,.jpeg,.png,.jpg,.gif,.webp"
          className="hidden"
        />
      </div>
    </div>
  );
};

export default function ComparePage() {
  const [img1, setImg1] = useState<File | null>(null);
  const [img2, setImg2] = useState<File | null>(null);
  const [preview1, setPreview1] = useState<string | null>(null);
  const [preview2, setPreview2] = useState<string | null>(null);
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (preview1) URL.revokeObjectURL(preview1);
      if (preview2) URL.revokeObjectURL(preview2);
    };
  }, [preview1, preview2]);

  const handleImage1Selected = (file: File) => {
    setImg1(file);
    if (preview1) URL.revokeObjectURL(preview1);
    setPreview1(URL.createObjectURL(file));
    setError(null);
    setResult(null);
  };

  const handleImage2Selected = (file: File) => {
    setImg2(file);
    if (preview2) URL.revokeObjectURL(preview2);
    setPreview2(URL.createObjectURL(file));
    setError(null);
    setResult(null);
  };

  const handleCompare = async () => {
    if (!img1 || !img2) {
      setError("Please select both images");
      return;
    }

    const formData = new FormData();
    formData.append("img1", img1);
    formData.append("img2", img2);

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch("http://localhost:8000/predict", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong");
      } else {
        setResult(data);
      }
    } catch (err) {
      console.error("API call failed:", err);
      setError(
        "Failed to connect to the server or an unexpected error occurred."
      );
    }

    setLoading(false);
  };

  return (
    <div className="bg-background text-foreground min-h-screen flex flex-col">
      <AppHeader />
      <main className="flex-grow p-6 md:p-10 flex flex-col items-center">
        <div className="w-full max-w-4xl">
          <h1 className="text-3xl lg:text-4xl font-bold mb-8 text-center">
            Compare Faces
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 mb-8">
            <ImageUploadArea
              labelText="Image 1"
              inputId="image1-upload"
              previewUrl={preview1}
              onImageSelect={handleImage1Selected}
            />
            <ImageUploadArea
              labelText="Image 2"
              inputId="image2-upload"
              previewUrl={preview2}
              onImageSelect={handleImage2Selected}
            />
          </div>

          <div className="flex justify-center mb-8">
            <button
              onClick={handleCompare}
              className="bg-primary text-primary-foreground px-8 py-3 rounded-lg text-lg font-semibold hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              disabled={loading || !img1 || !img2}
            >
              {loading ? "Comparing..." : "Compare"}
            </button>
          </div>

          {error && (
            <p className="text-red-400 text-center mt-4 mb-6 bg-red-900/30 dark:bg-red-900/10 p-3 rounded-md">
              {error}
            </p>
          )}

          {result && (
            <div className="mt-6 p-6 rounded-lg bg-card text-card-foreground shadow-xl max-w-md mx-auto border">
              <h2 className="text-2xl font-bold mb-4 text-center">
                Result
              </h2>
              <div className="space-y-2">
                <p>
                  <strong className="font-medium">
                    Distance:
                  </strong>{" "}
                  {typeof result.distance === "number"
                    ? result.distance.toFixed(17)
                    : result.distance}
                </p>
                <p>
                  <strong className="font-medium">
                    Similarity:
                  </strong>{" "}
                  {typeof result.similarity === "number"
                    ? result.similarity.toFixed(2) + "%"
                    : result.similarity}
                </p>
                <p>
                  <strong className="font-medium">
                    Verified:
                  </strong>{" "}
                  {result.verified ? (
                    <span className="text-green-600 font-semibold">Yes ✅</span>
                  ) : (
                    <span className="text-red-600 font-semibold">No ❌</span>
                  )}
                </p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
