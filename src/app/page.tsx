"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, Button, TextField, CircularProgress } from "@mui/material";
import { ImageIcon, Shield, AlertTriangle, Info, Eye } from "lucide-react";
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <Navigation />

      {/* Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
        
        {/* Allergies Widget */}
        <Card className="lg:col-span-1 xl:col-span-2 shadow-lg hover:shadow-xl transition-shadow duration-300" data-testid="allergies-card">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-red-100 dark:bg-red-900 rounded-lg" aria-hidden="true">
                <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />
              </div>
              <h2 className="text-xl font-semibold font-playfair" id="allergies-heading">YOUR ALLERGIES</h2>
            </div>
            <TextField
              label="List your known allergies"
              placeholder="Enter your allergies (e.g., peanuts, shellfish, dairy, gluten)..."
              value={allergies}
              onChange={(e) => setAllergies(e.target.value)}
              multiline
              rows={4}
              fullWidth
              className="mb-4 font-source-sans-pro"
              data-testid="allergies-input"
              aria-labelledby="allergies-heading"
              aria-describedby="allergies-description"
            />
            <div id="allergies-description" className="text-sm text-gray-600 dark:text-gray-400 font-source-sans-pro">
              List all known allergies separated by commas. This information helps our AI analyze food safety.
            </div>
          </CardContent>
        </Card>

        {/* Image Upload Widget */}
        <Card className="lg:col-span-1 shadow-lg hover:shadow-xl transition-shadow duration-300" data-testid="upload-card">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg" aria-hidden="true">
                <ImageIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <h2 className="text-xl font-semibold font-playfair" id="upload-heading">UPLOAD PHOTO</h2>
            </div>
            <ImageUpload onImageUpload={handleImageUpload} />
          </CardContent>
        </Card>

        {/* Image Preview Widget */}
        <Card className="lg:col-span-1 xl:col-span-2 shadow-lg hover:shadow-xl transition-shadow duration-300" data-testid="preview-card">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg" aria-hidden="true">
                <Eye className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <h2 className="text-xl font-semibold font-playfair" id="preview-heading">PREVIEW</h2>
            </div>
            {uploadedImage ? (
              <div className="relative w-full h-48 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden border" data-testid="image-preview">
                <Image
                  src={uploadedImage}
                  alt="Uploaded ingredient photo for allergy analysis"
                  fill
                  className="object-contain"
                />
              </div>
            ) : (
              <div className="w-full h-48 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center" role="img" aria-label="No image uploaded">
                <div className="text-center text-gray-500 dark:text-gray-400">
                  <Eye className="h-8 w-8 mx-auto mb-2 opacity-50" aria-hidden="true" />
                  <p className="text-sm font-source-sans-pro">Upload an image to preview</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Results Widget */}
        <Card className="lg:col-span-4 xl:col-span-4 shadow-lg hover:shadow-xl transition-shadow duration-300" data-testid="results-card">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-100 dark:bg-indigo-900 rounded-lg" aria-hidden="true">
                  <Info className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h2 className="text-xl font-semibold font-playfair" id="results-heading">SAFETY RESULTS</h2>
              </div>
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={analyzeIngredients}
                disabled={!uploadedImage || !allergies.trim() || isAnalyzing}
                className="w-full sm:w-auto font-source-sans-pro"
                data-testid="analyze-button"
                aria-label={isAnalyzing ? "Analyzing ingredients, please wait" : "Analyze ingredients for allergens"}
              >
                {isAnalyzing ? "Analyzing..." : "Analyze Ingredients"}
              </Button>
            </div>
            {isAnalyzing ? (
              <div className="text-center py-12 text-gray-500 dark:text-gray-400 font-source-sans-pro" role="status" aria-label="Analyzing ingredients" data-testid="loading-state">
                <CircularProgress size={64} className="mb-4" color="primary" />
                <p className="text-lg">Detecting allergens...</p>
                <p className="text-sm mt-2">Please wait while we analyze your food ingredients</p>
              </div>
            ) : results ? (
              <div role="region" aria-labelledby="results-heading" aria-live="polite" data-testid="results-content">
                <AllergyResults results={results} />
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500 dark:text-gray-400 font-source-sans-pro" role="status" aria-label="No results available">
                <Shield className="h-16 w-16 mx-auto mb-4 opacity-50" aria-hidden="true" />
                <p className="text-lg">Upload an image and analyze to see results</p>
                <p className="text-sm mt-2">Your food safety information will appear here</p>
              </div>
            )}
          </CardContent>
        </Card>

      </div>
      
      <Footer />
    </div>
  );
}