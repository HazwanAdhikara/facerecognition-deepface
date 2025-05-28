"use client";

import React, {
  useState,
  useRef,
  useEffect,
  DragEvent,
  ChangeEvent,
} from "react";
import Link from "next/link";
import {
  Layers,
  Code,
  Upload,
  Camera,
  Zap,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import Webcam from "react-webcam";

const MODELS = [
  "VGG-Face",
  "Facenet",
  "Facenet512",
  "OpenFace",
  "DeepID",
  "ArcFace",
  "SFace",
];

const AppHeader: React.FC = () => (
  <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
    <div className="container mx-auto flex h-16 max-w-screen-xl items-center justify-between px-4">
      <Link
        href="/"
        aria-label="Back to Homepage"
        className="flex items-center gap-2"
      >
        <Layers className="h-6 w-6 text-primary" />
        <span className="text-xl font-bold">CerminRupa</span>
      </Link>
      <nav className="hidden md:flex items-center gap-8">
        <Link
          href="/#features"
          className="text-sm font-medium hover:underline underline-offset-4"
        >
          Features
        </Link>
        <Link
          href="/#about"
          className="text-sm font-medium hover:underline underline-offset-4"
        >
          About
        </Link>
        <Link
          href="/compare"
          className="text-sm font-medium hover:underline underline-offset-4"
        >
          Compare Now!
        </Link>
      </nav>
      <div className="flex items-center gap-2">
        <ThemeToggle />
        <Link
          href="/teams"
          className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm hover:bg-accent hover:text-accent-foreground gap-1"
        >
          <Code className="h-4 w-4" />
          <span>Developers</span>
        </Link>
      </div>
    </div>
  </header>
);

interface ImageInputProps {
  label: string;
  previewUrl: string | null;
  onMediaSelect: (file: File) => void;
}

const ImageInput: React.FC<ImageInputProps> = ({
  label,
  previewUrl,
  onMediaSelect,
}) => {
  const [mode, setMode] = useState<"upload" | "camera">("upload");
  const [isDragging, setIsDragging] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const webcamRef = useRef<Webcam>(null);

  useEffect(() => {
    return () => {
      previewUrl && URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const handleFile = (file?: File | null) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) return alert("Select a valid image");
    onMediaSelect(file);
  };

  const handleUploadClick = () => fileRef.current?.click();

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };
  const handleDragLeave = () => setIsDragging(false);
  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    handleFile(e.dataTransfer.files[0]);
  };

  const capture = () => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      fetch(imageSrc)
        .then((res) => res.blob())
        .then((blob) => {
          const file = new File([blob], `${label}.jpg`, { type: "image/jpeg" });
          onMediaSelect(file);
        });
    }
  };

  return (
    <div className="flex flex-col items-center w-full">
      <div className="flex gap-2 mb-4 p-1 bg-muted rounded-lg">
        <button
          onClick={() => setMode("upload")}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
            mode === "upload"
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Upload className="h-4 w-4" />
          Upload
        </button>
        <button
          onClick={() => setMode("camera")}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
            mode === "camera"
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Camera className="h-4 w-4" />
          Camera
        </button>
      </div>

      {mode === "upload" ? (
        <div
          onClick={handleUploadClick}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`relative w-full max-w-xs h-80 bg-gradient-to-br from-muted/50 to-muted border-2 border-dashed rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all duration-300 hover:shadow-lg group ${
            isDragging
              ? "border-primary bg-primary/5 scale-105 shadow-xl"
              : "border-border hover:border-primary/50"
          }`}
        >
          {previewUrl ? (
            <div className="relative w-full h-full">
              <img
                src={previewUrl || "/placeholder.svg"}
                alt="preview"
                className="w-full h-full object-cover rounded-2xl"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-2xl flex items-center justify-center">
                <p className="text-white font-medium">Click to change</p>
              </div>
            </div>
          ) : (
            <div className="text-center text-muted-foreground p-6">
              <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50 group-hover:text-primary transition-colors duration-200" />
              <p className="font-medium mb-2">Drag & drop your image</p>
              <p className="text-sm">or click to browse</p>
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            ref={fileRef}
            onChange={(e) => handleFile(e.target.files?.[0])}
            className="hidden"
          />
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <div className="relative rounded-2xl overflow-hidden shadow-lg">
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              className="rounded-2xl"
              width={320}
              height={240}
            />
          </div>
          <button
            onClick={capture}
            className="mt-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 hover:shadow-lg transform hover:scale-105 flex items-center gap-2"
          >
            <Camera className="h-4 w-4" />
            Capture Photo
          </button>
          {previewUrl && (
            <div className="mt-4 relative">
              <img
                src={previewUrl || "/placeholder.svg"}
                alt="captured preview"
                className="w-80 h-60 object-cover rounded-2xl shadow-lg"
              />
            </div>
          )}
        </div>
      )}
      <div className="mt-4 px-4 py-2 bg-muted/50 rounded-lg">
        <span className="font-medium text-sm">{label}</span>
      </div>
    </div>
  );
};

export default function ComparePage() {
  const [img1, setImg1] = useState<File | null>(null);
  const [img2, setImg2] = useState<File | null>(null);
  const [preview1, setPreview1] = useState<string | null>(null);
  const [preview2, setPreview2] = useState<string | null>(null);
  const [model, setModel] = useState<string>(MODELS[2]);
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(
    () => () => {
      preview1 && URL.revokeObjectURL(preview1);
      preview2 && URL.revokeObjectURL(preview2);
    },
    [preview1, preview2]
  );

  const handleSelect1 = (file: File) => {
    setImg1(file);
    preview1 && URL.revokeObjectURL(preview1);
    setPreview1(URL.createObjectURL(file));
    setError(null);
    setResult(null);
  };

  const handleSelect2 = (file: File) => {
    setImg2(file);
    preview2 && URL.revokeObjectURL(preview2);
    setPreview2(URL.createObjectURL(file));
    setError(null);
    setResult(null);
  };

  const handleCompare = async () => {
    if (!img1 || !img2) return setError("Please provide both images.");
    setLoading(true);
    setError(null);
    setResult(null);
    const form = new FormData();
    form.append("img1", img1);
    form.append("img2", img2);
    form.append("model_name", model);
    try {
      const res = await fetch("http://localhost:8000/compare", {
        method: "POST",
        body: form,
      });
      const data = await res.json();
      if (!res.ok) setError(data.error || "Error comparing");
      else setResult(data);
    } catch {
      setError("Server error or network issue");
    }
    setLoading(false);
  };

  const getSimilarityColor = (similarity: number | string): string => {
    const value =
      typeof similarity === "string" ? parseFloat(similarity) : similarity;
    return value >= 65 ? "text-green-500" : "text-red-500";
  };

  return (
    <div className="bg-gradient-to-br from-background via-background to-muted/20 text-foreground min-h-screen flex flex-col">
      <AppHeader />
      <main className="flex-grow p-6 md:p-10 flex flex-col items-center">
        <div className="w-full max-w-6xl">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
              Compare Faces
            </h1>
            <p className="text-lg max-w-2xl mx-auto">
              Seberapa Mirip wajah Anda dengan orang lain? Unggah dua foto dan
              temukan persentase kemiripan wajah Anda dengan orang lain.
            </p>
          </div>

          {/* Image Input Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <div className="bg-card/50 backdrop-blur-sm border rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
              <ImageInput
                label="First Image"
                previewUrl={preview1}
                onMediaSelect={handleSelect1}
              />
            </div>
            <div className="bg-card/50 backdrop-blur-sm border rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
              <ImageInput
                label="Second Image"
                previewUrl={preview2}
                onMediaSelect={handleSelect2}
              />
            </div>
          </div>

          {/* Controls Section */}
          <div className="flex flex-col items-center gap-6 mb-12">
            <div className="bg-card/50 backdrop-blur-sm border rounded-2xl p-6 shadow-lg">
              <label className="block text-sm font-medium mb-3 text-center">
                Select AI Model
              </label>
              <select
                value={model}
                onChange={(e) => setModel(e.target.value)}
                className="w-full min-w-[200px] rounded-xl border border-input bg-background px-4 py-3 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
              >
                {MODELS.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={handleCompare}
              disabled={loading || !img1 || !img2}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white px-12 py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 disabled:hover:scale-100 flex items-center gap-3"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Analyzing...
                </>
              ) : (
                <>
                  <Zap className="h-5 w-5" />
                  Compare Faces
                </>
              )}
            </button>
          </div>

          {/* Error Display */}
          {error && (
            <div className="max-w-md mx-auto mb-8">
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-6 flex items-center gap-3">
                <XCircle className="h-6 w-6 text-red-500 flex-shrink-0" />
                <p className="text-red-700 dark:text-red-300 font-medium">
                  {error}
                </p>
              </div>
            </div>
          )}

          {/* Results Section */}
          {result && (
            <div className="max-w-2xl mx-auto">
              <div className="bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm border rounded-3xl p-8 shadow-xl">
                <div className="flex items-center gap-3 mb-6">
                  <CheckCircle className="h-8 w-8 text-green-500" />
                  <h2 className="text-3xl font-bold">Analysis Complete</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="bg-muted/50 rounded-xl p-4">
                      <p className="text-sm text-muted-foreground mb-1">
                        Distance
                      </p>
                      <p className="text-2xl font-mono font-bold">
                        {result.distance.toFixed(4)}
                      </p>
                    </div>

                    <div className="bg-muted/50 rounded-xl p-4">
                      <p className="text-sm text-muted-foreground mb-1">
                        Similarity
                      </p>
                      <p
                        className={`text-2xl font-bold ${getSimilarityColor(
                          result.similarity
                        )}`}
                      >
                        {parseFloat(result.similarity).toFixed(2)}%
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-muted/50 rounded-xl p-4">
                      <p className="text-sm text-muted-foreground mb-1">
                        Model Used
                      </p>
                      <p className="text-lg font-semibold">
                        {result.model_used}
                      </p>
                    </div>

                    <div className="bg-muted/50 rounded-xl p-4">
                      <p className="text-sm text-muted-foreground mb-1">
                        Verification
                      </p>
                      <div className="flex items-center gap-2">
                        {result.verified ? (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-500" />
                        )}
                        <p
                          className={`text-lg font-semibold ${
                            result.verified ? "text-green-500" : "text-red-500"
                          }`}
                        >
                          {result.verified ? "Verified Match" : "No Match"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
