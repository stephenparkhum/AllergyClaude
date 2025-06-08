"use client";

import { useState, useEffect } from "react";
import { Button, TextField, CircularProgress } from "@mui/material";
import { Shield, Eye } from "lucide-react";
import Image from "next/image";
import ImageUpload from "@/components/ImageUpload";
import AllergyResults from "@/components/AllergyResults";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { saveToLocalStorage, getFromLocalStorage } from "@/lib/utils/storage";
import { validateAnalysisRequest } from "@/lib/utils/validation";

export default function Home() {
  const [allergies, setAllergies] = useState<string>("");
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [results, setResults] = useState<{
    safe: boolean;
    detected_allergens: string[];
    potential_allergens: string[];
    safe_ingredients: string[];
    warning_ingredients: string[];
    unsafe_ingredients: string[];
    ingredients: string[];
    analysis: string;
  } | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Handle mounting and localStorage
  useEffect(() => {
    setMounted(true);
    const savedAllergies = getFromLocalStorage('userAllergies');
    if (savedAllergies) {
      setAllergies(savedAllergies);
    }
  }, []);

  // Save allergies to localStorage when they change (only after mounted)
  useEffect(() => {
    if (mounted && allergies.trim()) {
      saveToLocalStorage('userAllergies', allergies);
    }
  }, [allergies, mounted]);

  const handleImageUpload = (imageData: string) => {
    setUploadedImage(imageData);
    setResults(null);
  };

  const analyzeIngredients = async () => {
    const validation = validateAnalysisRequest(uploadedImage, allergies);
    if (!validation.isValid) {
      alert(validation.error);
      return;
    }

    setIsAnalyzing(true);
    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image: uploadedImage,
          allergies: allergies.trim(),
        }),
      });

      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error("Error analyzing ingredients:", error);
      alert("Error analyzing ingredients. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen" style={{ background: 'var(--background)' }}>
      <Navigation />

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          
          {/* Left Column - Input */}
          <div className="lg:col-span-1 space-y-6">
            {/* Allergies Section */}
            <div className="minimal-card p-6" data-testid="allergies-card">
              <h2 className="text-xl font-semibold mb-4" style={{ color: 'var(--foreground)' }} id="allergies-heading">
                Your Allergies
              </h2>
              <TextField
                label="Known allergies"
                placeholder="peanuts, shellfish, dairy, gluten..."
                value={allergies}
                onChange={(e) => setAllergies(e.target.value)}
                multiline
                rows={4}
                fullWidth
                variant="outlined"
                className="minimal-input"
                data-testid="allergies-input"
                aria-labelledby="allergies-heading"
                aria-describedby="allergies-description"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: 'var(--surface)',
                    borderRadius: 'calc(var(--radius) - 4px)',
                    '& fieldset': {
                      borderColor: 'var(--border)',
                    },
                    '&:hover fieldset': {
                      borderColor: 'var(--accent)',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'var(--accent)',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: 'var(--muted)',
                  },
                  '& .MuiInputBase-input': {
                    color: 'var(--foreground)',
                  },
                }}
              />
              <p id="allergies-description" className="text-sm mt-3" style={{ color: 'var(--muted)' }}>
                List allergies separated by commas for accurate analysis
              </p>
            </div>

            {/* Upload Section */}
            <div className="minimal-card p-6" data-testid="upload-card">
              <h2 className="text-xl font-semibold mb-4" style={{ color: 'var(--foreground)' }} id="upload-heading">
                Food Label Photo
              </h2>
              <ImageUpload onImageUpload={handleImageUpload} />
            </div>
          </div>

          {/* Right Column - Preview & Analysis */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Preview */}
            <div className="minimal-card p-6" data-testid="preview-card">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold" style={{ color: 'var(--foreground)' }} id="preview-heading">
                  Preview
                </h2>
                <Button
                  variant="contained"
                  onClick={analyzeIngredients}
                  disabled={!uploadedImage || !allergies.trim() || isAnalyzing}
                  className="minimal-button"
                  data-testid="analyze-button"
                  aria-label={isAnalyzing ? "Analyzing ingredients, please wait" : "Analyze ingredients for allergens"}
                  sx={{
                    backgroundColor: 'var(--accent)',
                    color: 'white',
                    borderRadius: 'calc(var(--radius) - 2px)',
                    fontWeight: 500,
                    textTransform: 'none',
                    boxShadow: 'none',
                    '&:hover': {
                      backgroundColor: 'var(--accent)',
                      opacity: 0.9,
                      boxShadow: 'none',
                    },
                    '&:disabled': {
                      backgroundColor: 'var(--muted)',
                      color: 'white',
                    },
                  }}
                >
                  {isAnalyzing ? "Analyzing..." : "Analyze"}
                </Button>
              </div>
              
              {uploadedImage ? (
                <div className="relative w-full h-64 rounded-lg overflow-hidden" style={{ backgroundColor: 'var(--background)' }} data-testid="image-preview">
                  <Image
                    src={uploadedImage}
                    alt="Uploaded ingredient photo for allergy analysis"
                    fill
                    className="object-contain"
                  />
                </div>
              ) : (
                <div 
                  className="w-full h-64 rounded-lg flex items-center justify-center" 
                  style={{ backgroundColor: 'var(--background)', border: '1px dashed var(--border)' }}
                  role="img" 
                  aria-label="No image uploaded"
                >
                  <div className="text-center">
                    <Eye className="h-12 w-12 mx-auto mb-3 opacity-30" style={{ color: 'var(--muted)' }} aria-hidden="true" />
                    <p className="text-sm" style={{ color: 'var(--muted)' }}>Upload an image to preview</p>
                  </div>
                </div>
              )}
            </div>

            {/* Results Section */}
            <div className="minimal-card p-6" data-testid="results-card">
              <h2 className="text-xl font-semibold mb-4" style={{ color: 'var(--foreground)' }} id="results-heading">
                Safety Analysis
              </h2>
              
              {isAnalyzing ? (
                <div className="text-center py-12" role="status" aria-label="Analyzing ingredients" data-testid="loading-state">
                  <CircularProgress size={48} sx={{ color: 'var(--accent)', mb: 3 }} />
                  <p className="text-lg mb-2" style={{ color: 'var(--foreground)' }}>Analyzing ingredients...</p>
                  <p className="text-sm" style={{ color: 'var(--muted)' }}>This may take a moment</p>
                </div>
              ) : results ? (
                <div role="region" aria-labelledby="results-heading" aria-live="polite" data-testid="results-content">
                  <AllergyResults results={results} />
                </div>
              ) : (
                <div className="text-center py-12" role="status" aria-label="No results available">
                  <Shield className="h-16 w-16 mx-auto mb-4 opacity-20" style={{ color: 'var(--muted)' }} aria-hidden="true" />
                  <p className="text-lg mb-2" style={{ color: 'var(--muted)' }}>Upload an image to begin analysis</p>
                  <p className="text-sm" style={{ color: 'var(--muted)' }}>Your safety results will appear here</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}