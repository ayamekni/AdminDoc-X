import { useState, useEffect } from "react";
import { Upload, FileText, Check, Sparkles } from "lucide-react";

const BoundingBox = ({ x, y, width, height, label, delay }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  if (!visible) return null;

  return (
    <div
      className="absolute border-2 border-primary rounded transition-all duration-500"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: `${width}%`,
        height: `${height}%`,
        boxShadow: "0 0 10px hsla(187, 100%, 50%, 0.5)",
      }}
    >
      <span className="absolute -top-6 left-0 text-xs font-mono text-primary bg-background/80 px-2 py-0.5 rounded">
        {label}
      </span>
    </div>
  );
};

export const DemoSection = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [apiData, setApiData] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showResults, setShowResults] = useState(false);

  // ===========================
  // HANDLE UPLOAD
  // ===========================
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  // ===========================
  // CALL API
  // ===========================
  const handleDemo = async () => {
    if (!selectedFile) {
      alert("Please upload a document first!");
      return;
    }

    setIsProcessing(true);
    setShowResults(false);

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const res = await fetch("http://localhost:5000/process", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      console.log("API Response:", data);

      setApiData(data);
      setIsProcessing(false);
      setShowResults(true);
    } catch (error) {
      console.error(error);
      setIsProcessing(false);
    }
  };

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-30" />

      <div className="container mx-auto px-6 relative z-10">

        {/* UI HEADER */}
        <div className="text-center mb-16">
          <span className="text-primary font-mono text-sm tracking-wider mb-4 block">
            // LIVE DEMO
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            See It <span className="gradient-text">In Action</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Watch AdminDoc-X transform a scanned document into structured data in real time
          </p>
        </div>

        {/* FILE UPLOAD INPUT */}
        <div className="mb-6 text-center">
          <input
            type="file"
            accept="image/*,.pdf"
            onChange={handleFileChange}
            className="cursor-pointer"
          />
        </div>

        {/* MAIN BLOCKS */}
        <div className="max-w-6xl mx-auto">
          <div className="glass-strong rounded-3xl p-2 md:p-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

              {/* LEFT – Document Preview */}
              <div className="relative">
                <div className="glass rounded-2xl p-6 h-full min-h-[500px] relative overflow-hidden">

                  <div className="bg-foreground/5 rounded-xl p-6 relative">

                    {/* Bounding boxes */}
                    {showResults &&
                      apiData?.bounding_boxes?.map((box, index) => (
                        <BoundingBox
                          key={index}
                          x={box.coords[0]}
                          y={box.coords[1]}
                          width={box.coords[2] - box.coords[0]}
                          height={box.coords[3] - box.coords[1]}
                          label={box.field}
                          delay={index * 200}
                        />
                      ))}

                    {/* Scan animation */}
                    {isProcessing && (
                      <div className="absolute inset-0 overflow-hidden">
                        <div className="scan-line animate-scan" />
                      </div>
                    )}
                  </div>

                  {/* BUTTON */}
                  <button
                    onClick={handleDemo}
                    disabled={isProcessing}
                    className="w-full mt-4 btn-hero flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isProcessing ? (
                      <>
                        <Sparkles className="w-5 h-5 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Upload className="w-5 h-5" />
                        Process Document
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* RIGHT – JSON OUTPUT */}
              <div className="relative">
                <div className="glass rounded-2xl p-6 h-full min-h-[500px]">
                  <div className="json-block h-[calc(100%-80px)] overflow-auto">
                    {showResults ? (
                      <pre className="text-foreground/90">
                        <code>{JSON.stringify(apiData, null, 2)}</code>
                      </pre>
                    ) : (
                      <p className="text-center text-muted-foreground">
                        Process a document to see the output
                      </p>
                    )}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
