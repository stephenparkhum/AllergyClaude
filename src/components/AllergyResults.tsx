"use client";

import { Card, CardContent, Chip } from "@mui/material";
import { CheckCircle, XCircle, AlertTriangle, List, ThumbsUp, ThumbsDown } from "lucide-react";

interface AllergyResult {
  safe: boolean;
  detected_allergens: string[];
  potential_allergens: string[];
  safe_ingredients: string[];
  warning_ingredients: string[];
  unsafe_ingredients: string[];
  ingredients: string[];
  analysis: string;
}

interface AllergyResultsProps {
  results: AllergyResult;
}

export default function AllergyResults({ results }: AllergyResultsProps) {
  // Determine overall safety status
  const hasDefiniteAllergens = results.detected_allergens.length > 0;
  const hasPotentialAllergens = results.potential_allergens.length > 0;
  const isWarningState = !hasDefiniteAllergens && hasPotentialAllergens && results.safe;

  return (
    <div className="space-y-6" data-testid="allergy-results">

      <Card className={`border-2 shadow-lg ${
        hasDefiniteAllergens 
          ? "border-red-500 bg-red-50 dark:bg-red-950" 
          : isWarningState
            ? "border-orange-500 bg-orange-50 dark:bg-orange-950"
            : "border-green-500 bg-green-50 dark:bg-green-950"
      }`}>
        <CardContent className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-2">
              {hasDefiniteAllergens ? (
                <>
                  <XCircle className="w-8 h-8 text-red-600" aria-hidden="true" />
                  <ThumbsDown className="w-6 h-6 text-red-600" aria-hidden="true" />
                </>
              ) : isWarningState ? (
                <>
                  <AlertTriangle className="w-8 h-8 text-orange-600" aria-hidden="true" />
                </>
              ) : (
                <>
                  <CheckCircle className="w-8 h-8 text-green-600" aria-hidden="true" />
                  <ThumbsUp className="w-6 h-6 text-green-600" aria-hidden="true" />
                </>
              )}
            </div>
            <div className="flex-1">
              <h3 
                className={`text-xl font-semibold font-playfair ${
                  hasDefiniteAllergens 
                    ? "text-red-800 dark:text-red-200" 
                    : isWarningState
                      ? "text-orange-800 dark:text-orange-200"
                      : "text-green-800 dark:text-green-200"
                }`}
                data-testid="safety-status"
                role="alert"
                aria-live="assertive"
              >
                {hasDefiniteAllergens 
                  ? "CONTAINS ALLERGENS" 
                  : isWarningState 
                    ? "POTENTIAL ALLERGENS" 
                    : "SAFE TO CONSUME"}
              </h3>
              <p className={`text-sm font-source-sans-pro mt-1 ${
                hasDefiniteAllergens 
                  ? "text-red-700 dark:text-red-300" 
                  : isWarningState
                    ? "text-orange-700 dark:text-orange-300"
                    : "text-green-700 dark:text-green-300"
              }`}>
                {hasDefiniteAllergens 
                  ? "This food contains ingredients you are allergic to." 
                  : isWarningState 
                    ? "This food contains ingredients that might be related to your allergies."
                    : "This food appears safe based on your listed allergies."}
              </p>
            </div>
          </div>
          
          {hasDefiniteAllergens && (
            <div className="mb-4" data-testid="detected-allergens">
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle className="w-5 h-5 text-red-600" aria-hidden="true" />
                <h4 className="text-base font-medium text-red-700 dark:text-red-300 font-playfair" id="allergens-heading">
                  DETECTED ALLERGENS:
                </h4>
              </div>
              <div className="flex flex-wrap gap-2" role="list" aria-labelledby="allergens-heading">
                {results.detected_allergens.map((allergen, index) => (
                  <Chip 
                    key={index} 
                    color="error" 
                    variant="filled" 
                    size="medium" 
                    className="font-source-sans-pro font-medium"
                    data-testid={`allergen-${allergen.toLowerCase().replace(/\s+/g, '-')}`}
                    role="listitem"
                    aria-label={`Allergen detected: ${allergen}`}
                    label={allergen}
                  />
                ))}
              </div>
            </div>
          )}

          {hasPotentialAllergens && (
            <div className="mb-4" data-testid="potential-allergens">
              <div className="flex flex-wrap gap-2" role="list">
                {results.potential_allergens.map((allergen, index) => (
                  <Chip 
                    key={index} 
                    color="warning" 
                    variant="filled" 
                    size="medium" 
                    className="font-source-sans-pro font-medium"
                    data-testid={`potential-allergen-${allergen.toLowerCase().replace(/\s+/g, '-')}`}
                    role="listitem"
                    aria-label={`Potential allergen: ${allergen}`}
                    label={allergen}
                  />
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {(results.safe_ingredients.length > 0 || results.warning_ingredients.length > 0 || results.unsafe_ingredients.length > 0) && (
        <Card className="shadow-md" data-testid="ingredients-card">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <List className="w-5 h-5 text-gray-600 dark:text-gray-400" aria-hidden="true" />
              <h4 className="font-semibold font-playfair text-lg" id="ingredients-heading">DETECTED INGREDIENTS:</h4>
            </div>
            
            <div className="space-y-4">
              {/* Safe Ingredients */}
              {results.safe_ingredients.length > 0 && (
                <div>
                  <h5 className="text-sm font-semibold text-green-700 dark:text-green-300 mb-2 font-playfair">SAFE INGREDIENTS:</h5>
                  <div className="flex flex-wrap gap-2">
                    {results.safe_ingredients.map((ingredient, index) => (
                      <Chip 
                        key={`safe-${index}`} 
                        color="success"
                        variant="filled" 
                        size="medium" 
                        className="font-source-sans-pro"
                        data-testid={`safe-ingredient-${ingredient.toLowerCase().replace(/\s+/g, '-')}`}
                        role="listitem"
                        aria-label={`Safe ingredient: ${ingredient}`}
                        label={ingredient}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Warning Ingredients */}
              {results.warning_ingredients.length > 0 && (
                <div>
                  <h5 className="text-sm font-semibold text-orange-700 dark:text-orange-300 mb-2 font-playfair">CAUTION INGREDIENTS:</h5>
                  <div className="flex flex-wrap gap-2">
                    {results.warning_ingredients.map((ingredient, index) => (
                      <Chip 
                        key={`warning-${index}`} 
                        color="warning"
                        variant="filled" 
                        size="medium" 
                        className="font-source-sans-pro"
                        data-testid={`warning-ingredient-${ingredient.toLowerCase().replace(/\s+/g, '-')}`}
                        role="listitem"
                        aria-label={`Warning ingredient: ${ingredient}`}
                        label={ingredient}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Unsafe Ingredients */}
              {results.unsafe_ingredients.length > 0 && (
                <div>
                  <h5 className="text-sm font-semibold text-red-700 dark:text-red-300 mb-2 font-playfair">UNSAFE INGREDIENTS:</h5>
                  <div className="flex flex-wrap gap-2">
                    {results.unsafe_ingredients.map((ingredient, index) => (
                      <Chip 
                        key={`unsafe-${index}`} 
                        color="error"
                        variant="filled" 
                        size="medium" 
                        className="font-source-sans-pro"
                        data-testid={`unsafe-ingredient-${ingredient.toLowerCase().replace(/\s+/g, '-')}`}
                        role="listitem"
                        aria-label={`Unsafe ingredient: ${ingredient}`}
                        label={ingredient}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {results.analysis && (
        <Card className="shadow-md" data-testid="analysis-card">
          <CardContent className="p-6">
            <h4 className="font-semibold mb-4 font-playfair text-lg" id="analysis-text-heading">DETAILED ANALYSIS:</h4>
            <div 
              className="text-sm text-gray-600 dark:text-gray-300 font-source-sans-pro leading-relaxed"
              aria-labelledby="analysis-text-heading"
              data-testid="analysis-text"
            >
              {results.analysis}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}