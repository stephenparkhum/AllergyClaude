"use client";

import { Card, CardContent, Button } from "@mui/material";
import { CheckCircle, XCircle, AlertTriangle, Camera, FileImage, Eye, Shield } from "lucide-react";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function HowToPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <Navigation />

      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Step-by-Step Guide */}
        <Card className="shadow-lg" data-testid="step-guide-card">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold font-playfair mb-6 text-gray-900 dark:text-white">
              STEP-BY-STEP GUIDE
            </h2>
            
            <div className="space-y-8">
              {/* Step 1 */}
              <div className="flex gap-6" data-testid="step-1">
                <div className="flex-shrink-0 w-12 h-12 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center">
                  <span className="text-xl font-bold text-red-600 dark:text-red-400 font-playfair">1</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold font-playfair text-gray-900 dark:text-white mb-2">
                    LIST YOUR ALLERGIES
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 font-source-sans-pro mb-3">
                    Enter all your known allergies in the text area. Be specific and include all forms (e.g., &quot;milk, dairy, lactose&quot;).
                  </p>
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                    <p className="text-sm font-source-sans-pro text-gray-700 dark:text-gray-300">
                      <strong>Example:</strong> &quot;peanuts, tree nuts, shellfish, dairy, eggs, soy&quot;
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex gap-6" data-testid="step-2">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                  <span className="text-xl font-bold text-blue-600 dark:text-blue-400 font-playfair">2</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold font-playfair text-gray-900 dark:text-white mb-2">
                    TAKE A CLEAR PHOTO
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 font-source-sans-pro mb-3">
                    Photograph the ingredient list on the food package. Ensure the text is clear and readable.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <span className="font-semibold text-green-800 dark:text-green-200 font-playfair">GOOD PHOTOS</span>
                      </div>
                      <ul className="text-sm text-green-700 dark:text-green-300 font-source-sans-pro space-y-1">
                        <li>• Clear, focused ingredient list</li>
                        <li>• Good lighting</li>
                        <li>• Text is readable</li>
                        <li>• Full ingredients panel visible</li>
                      </ul>
                    </div>
                    <div className="bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <XCircle className="h-5 w-5 text-red-600" />
                        <span className="font-semibold text-red-800 dark:text-red-200 font-playfair">AVOID</span>
                      </div>
                      <ul className="text-sm text-red-700 dark:text-red-300 font-source-sans-pro space-y-1">
                        <li>• Blurry or out-of-focus images</li>
                        <li>• Poor lighting/shadows</li>
                        <li>• Partial ingredient lists</li>
                        <li>• Reflective surfaces/glare</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex gap-6" data-testid="step-3">
                <div className="flex-shrink-0 w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                  <span className="text-xl font-bold text-green-600 dark:text-green-400 font-playfair">3</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold font-playfair text-gray-900 dark:text-white mb-2">
                    UPLOAD AND ANALYZE
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 font-source-sans-pro mb-3">
                    Upload your photo and click "Analyze Ingredients" to get instant allergy detection results.
                  </p>
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                    <p className="text-sm font-source-sans-pro text-gray-700 dark:text-gray-300">
                      The AI will scan the ingredients and cross-reference them with your allergies, including hidden allergens and "&quot;may contain&quot;" warnings.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Good Use Cases */}
        <Card className="shadow-lg" data-testid="good-use-cases-card">
          <CardContent className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <h2 className="text-2xl font-bold font-playfair text-gray-900 dark:text-white">
                RECOMMENDED USE CASES
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg p-4">
                  <h3 className="font-semibold text-green-800 dark:text-green-200 font-playfair mb-2">
                    ✓ PACKAGED FOODS
                  </h3>
                  <p className="text-sm text-green-700 dark:text-green-300 font-source-sans-pro">
                    Snacks, cereals, canned goods, frozen meals with clear ingredient labels
                  </p>
                </div>

                <div className="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg p-4">
                  <h3 className="font-semibold text-green-800 dark:text-green-200 font-playfair mb-2">
                    ✓ INGREDIENT VERIFICATION
                  </h3>
                  <p className="text-sm text-green-700 dark:text-green-300 font-source-sans-pro">
                    Double-checking ingredient lists for hidden allergens or alternative names
                  </p>
                </div>

                <div className="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg p-4">
                  <h3 className="font-semibold text-green-800 dark:text-green-200 font-playfair mb-2">
                    ✓ NEW PRODUCTS
                  </h3>
                  <p className="text-sm text-green-700 dark:text-green-300 font-source-sans-pro">
                    Trying new foods or brands when you're unsure about their safety
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg p-4">
                  <h3 className="font-semibold text-green-800 dark:text-green-200 font-playfair mb-2">
                    ✓ TRAVEL & SHOPPING
                  </h3>
                  <p className="text-sm text-green-700 dark:text-green-300 font-source-sans-pro">
                    Quick checks while grocery shopping or when traveling abroad
                  </p>
                </div>

                <div className="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg p-4">
                  <h3 className="font-semibold text-green-800 dark:text-green-200 font-playfair mb-2">
                    ✓ EDUCATION
                  </h3>
                  <p className="text-sm text-green-700 dark:text-green-300 font-source-sans-pro">
                    Learning about hidden allergens and alternative ingredient names
                  </p>
                </div>

                <div className="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg p-4">
                  <h3 className="font-semibold text-green-800 dark:text-green-200 font-playfair mb-2">
                    ✓ FAMILY SAFETY
                  </h3>
                  <p className="text-sm text-green-700 dark:text-green-300 font-source-sans-pro">
                    Helping family members or caregivers check food safety
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* What NOT to Use For */}
        <Card className="shadow-lg" data-testid="avoid-use-cases-card">
          <CardContent className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <AlertTriangle className="h-8 w-8 text-red-600" />
              <h2 className="text-2xl font-bold font-playfair text-gray-900 dark:text-white">
                IMPORTANT LIMITATIONS
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg p-4">
                  <h3 className="font-semibold text-red-800 dark:text-red-200 font-playfair mb-2">
                    ⚠️ EMERGENCY SITUATIONS
                  </h3>
                  <p className="text-sm text-red-700 dark:text-red-300 font-source-sans-pro">
                    Never rely solely on this app during allergic reactions. Seek immediate medical help.
                  </p>
                </div>

                <div className="bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg p-4">
                  <h3 className="font-semibold text-red-800 dark:text-red-200 font-playfair mb-2">
                    ⚠️ RESTAURANT MEALS
                  </h3>
                  <p className="text-sm text-red-700 dark:text-red-300 font-source-sans-pro">
                    Cannot analyze prepared foods, restaurant dishes, or foods without ingredient labels
                  </p>
                </div>

                <div className="bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg p-4">
                  <h3 className="font-semibold text-red-800 dark:text-red-200 font-playfair mb-2">
                    ⚠️ SEVERE ALLERGIES
                  </h3>
                  <p className="text-sm text-red-700 dark:text-red-300 font-source-sans-pro">
                    Always verify ingredients manually if you have life-threatening allergies
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg p-4">
                  <h3 className="font-semibold text-red-800 dark:text-red-200 font-playfair mb-2">
                    ⚠️ CROSS-CONTAMINATION
                  </h3>
                  <p className="text-sm text-red-700 dark:text-red-300 font-source-sans-pro">
                    Cannot detect facility cross-contamination beyond what's listed on labels
                  </p>
                </div>

                <div className="bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg p-4">
                  <h3 className="font-semibold text-red-800 dark:text-red-200 font-playfair mb-2">
                    ⚠️ UNCLEAR IMAGES
                  </h3>
                  <p className="text-sm text-red-700 dark:text-red-300 font-source-sans-pro">
                    Results may be inaccurate with blurry, partial, or poor-quality images
                  </p>
                </div>

                <div className="bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg p-4">
                  <h3 className="font-semibold text-red-800 dark:text-red-200 font-playfair mb-2">
                    ⚠️ SOLE DECISION MAKING
                  </h3>
                  <p className="text-sm text-red-700 dark:text-red-300 font-source-sans-pro">
                    Always double-check results and consult healthcare providers for medical advice
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tips for Best Results */}
        <Card className="shadow-lg" data-testid="tips-card">
          <CardContent className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <Shield className="h-8 w-8 text-blue-600" />
              <h2 className="text-2xl font-bold font-playfair text-gray-900 dark:text-white">
                TIPS FOR BEST RESULTS
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <Camera className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="font-semibold font-playfair text-gray-900 dark:text-white mb-2">
                  PHOTO QUALITY
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 font-source-sans-pro">
                  Use good lighting and ensure ingredients text is clear and in focus
                </p>
              </div>

              <div className="text-center">
                <FileImage className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="font-semibold font-playfair text-gray-900 dark:text-white mb-2">
                  COMPLETE LABELS
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 font-source-sans-pro">
                  Capture the entire ingredient list including "&quot;may contain&quot;" warnings
                </p>
              </div>

              <div className="text-center">
                <Eye className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="font-semibold font-playfair text-gray-900 dark:text-white mb-2">
                  VERIFY RESULTS
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 font-source-sans-pro">
                  Always double-check the analysis with your own reading of the label
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <Card className="shadow-lg" data-testid="cta-card">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold font-playfair text-gray-900 dark:text-white mb-4">
              READY TO GET STARTED?
            </h2>
            <p className="text-gray-600 dark:text-gray-400 font-source-sans-pro mb-6 max-w-2xl mx-auto">
              Now that you know how to use Allergy Agents safely and effectively, head back to the main page to start analyzing your food for allergens.
            </p>
            <Link href="/">
              <Button 
                variant="contained"
                color="primary" 
                size="large" 
                className="font-source-sans-pro"
                data-testid="start-analyzing-button"
              >
                Start Analyzing Food
              </Button>
            </Link>
          </CardContent>
        </Card>

      </div>
      
      <Footer />
    </div>
  );
}