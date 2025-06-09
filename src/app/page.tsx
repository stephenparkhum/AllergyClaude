'use client';

import { useState } from 'react';
import {
  CircularProgress,
  Tabs,
  Tab,
  Box,
  Chip,
  Typography,
  Card,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Shield, CheckCircle, AlertTriangle } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import SetupAnalysis from '@/components/SetupAnalysis';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { validateAnalysisRequest } from '@/lib/utils/validation';

// TabPanel component for the results tabs
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel({ children, value, index, ...other }: TabPanelProps) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`results-tabpanel-${index}`}
      aria-labelledby={`results-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 2 }}>{children}</Box>}
    </div>
  );
}

export default function Home() {
  const [allergies, setAllergies] = useLocalStorage('userAllergies', '');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));
  const [results, setResults] = useState<{
    safe: boolean;
    food_name: string;
    food_brand: string;
    detected_allergens: string[];
    potential_allergens: string[];
    safe_ingredients: string[];
    warning_ingredients: string[];
    unsafe_ingredients: string[];
    ingredients: string[];
    analysis: string;
  } | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // allergies are now automatically synced with localStorage via useLocalStorage hook

  const handleImageUpload = (imageData: string) => {
    setUploadedImage(imageData);
    setResults(null);
  };

  const handleRemoveImage = () => {
    setUploadedImage(null);
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
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          image: uploadedImage,
          allergies: allergies.trim(),
        }),
      });

      const data = await response.json();
      setResults(data);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error analyzing ingredients:', error);
      alert('Error analyzing ingredients. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen" style={{ background: 'var(--background)' }}>
      <Navigation />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
        {isMobile ? (
          // Mobile Layout - Single Column
          <div className="space-y-6">
            {/* Mobile Input Section */}
            <SetupAnalysis
              allergies={allergies}
              setAllergies={setAllergies}
              uploadedImage={uploadedImage}
              onImageUpload={handleImageUpload}
              onRemoveImage={handleRemoveImage}
              onAnalyze={analyzeIngredients}
              isAnalyzing={isAnalyzing}
            />

            {/* Results with Tabs */}
            <Card className="p-6" data-testid="results-card" elevation={2}>
              <Typography variant="h5" className="mb-4 font-semibold" style={{ color: 'var(--foreground)' }}>
                <span style={{ color: 'var(--secondary)' }}>Results</span>
              </Typography>

              {isAnalyzing ? (
                <div className="text-center py-8">
                  <CircularProgress size={32} sx={{ color: 'var(--accent)', mb: 2 }} />
                  <Typography variant="body2" style={{ color: 'var(--muted)' }}>
                    Analyzing ingredients...
                  </Typography>
                </div>
              ) : results ? (
                <div>
                  {/* Product Information */}
                  {(results.food_name !== 'Unknown Product' ||
                    results.food_brand !== 'Unknown Brand') && (
                    <div
                      className="mb-4 p-3 rounded-lg"
                      style={{
                        backgroundColor: 'var(--surface)',
                        border: '1px solid var(--border)',
                      }}
                    >
                      <Typography
                        variant="subtitle2"
                        className="font-semibold mb-1"
                        style={{ color: 'var(--foreground)' }}
                      >
                        Product Information
                      </Typography>
                      {results.food_brand !== 'Unknown Brand' && (
                        <Typography variant="body2" style={{ color: 'var(--muted)' }}>
                          <strong>Brand:</strong> {results.food_brand}
                        </Typography>
                      )}
                      {results.food_name !== 'Unknown Product' && (
                        <Typography variant="body2" style={{ color: 'var(--muted)' }}>
                          <strong>Product:</strong> {results.food_name}
                        </Typography>
                      )}
                    </div>
                  )}

                  {/* Compact Safety Status */}
                  <div className="flex items-center gap-2 mb-4">
                    <Chip
                      icon={
                        results.safe ? (
                          <CheckCircle className="h-4 w-4" />
                        ) : (
                          <AlertTriangle className="h-4 w-4" />
                        )
                      }
                      label={results.safe ? 'SAFE' : 'CONTAINS ALLERGENS'}
                      color={results.safe ? 'success' : 'error'}
                      variant="filled"
                      size="small"
                    />
                    <Typography variant="body2" style={{ color: 'var(--muted)' }}>
                      {results.detected_allergens.length} allergen
                      {results.detected_allergens.length !== 1 ? 's' : ''} detected
                    </Typography>
                  </div>

                  {/* Tabbed Results */}
                  <Box sx={{ borderBottom: 1, borderColor: 'var(--border)' }}>
                    <Tabs
                      value={activeTab}
                      onChange={(_, newValue) => setActiveTab(newValue)}
                      variant="fullWidth"
                      textColor="inherit"
                      indicatorColor="primary"
                    >
                      <Tab label="Safety" sx={{ color: 'var(--foreground)', minHeight: 40 }} />
                      <Tab label="Ingredients" sx={{ color: 'var(--foreground)', minHeight: 40 }} />
                      <Tab label="Analysis" sx={{ color: 'var(--foreground)', minHeight: 40 }} />
                    </Tabs>
                  </Box>

                  <TabPanel value={activeTab} index={0}>
                    {/* Safety Tab - Detected Allergens */}
                    <div className="space-y-4">
                      {results.detected_allergens.length > 0 && (
                        <div>
                          <Typography variant="caption" color="error" className="font-semibold">
                            DETECTED ALLERGENS:
                          </Typography>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {results.detected_allergens.map(allergen => (
                              <Chip key={allergen} label={allergen} size="small" color="error" />
                            ))}
                          </div>
                        </div>
                      )}
                      {results.potential_allergens.length > 0 && (
                        <div>
                          <Typography variant="caption" color="warning" className="font-semibold">
                            POTENTIAL ALLERGENS:
                          </Typography>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {results.potential_allergens.map(allergen => (
                              <Chip key={allergen} label={allergen} size="small" color="warning" />
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </TabPanel>

                  <TabPanel value={activeTab} index={1}>
                    {/* Ingredients Tab */}
                    <div className="space-y-4">
                      <div className="flex flex-wrap gap-2 mb-4">
                        {results.ingredients.map(ingredient => {
                          // Determine the color based on which category the ingredient is in
                          let chipColor: 'success' | 'warning' | 'error' | 'default' = 'default';
                          let chipVariant: 'filled' | 'outlined' = 'outlined';

                          if (results.safe_ingredients.includes(ingredient)) {
                            chipColor = 'success';
                          } else if (results.warning_ingredients.includes(ingredient)) {
                            chipColor = 'warning';
                          } else if (results.unsafe_ingredients.includes(ingredient)) {
                            chipColor = 'error';
                            chipVariant = 'filled';
                          }

                          return (
                            <Chip
                              key={ingredient}
                              label={ingredient}
                              size="small"
                              color={chipColor}
                              variant={chipVariant}
                            />
                          );
                        })}
                      </div>

                      {results.unsafe_ingredients.length > 0 && (
                        <div>
                          <Typography variant="caption" color="error" className="font-semibold">
                            ⚠️ UNSAFE INGREDIENTS:
                          </Typography>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {results.unsafe_ingredients.map(ingredient => (
                              <Chip
                                key={ingredient}
                                label={ingredient}
                                size="small"
                                color="error"
                                variant="filled"
                              />
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </TabPanel>

                  <TabPanel value={activeTab} index={2}>
                    {/* Analysis Tab */}
                    <Typography
                      variant="body2"
                      style={{ color: 'var(--foreground)', lineHeight: 1.6 }}
                    >
                      {results.analysis}
                    </Typography>
                  </TabPanel>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Shield
                    className="h-12 w-12 mx-auto mb-3 opacity-20"
                    style={{ color: 'var(--muted)' }}
                  />
                  <Typography variant="body2" style={{ color: 'var(--muted)' }}>
                    Upload an image to begin analysis
                  </Typography>
                </div>
              )}
            </Card>
          </div>
        ) : (
          // Desktop Layout - Sidebar + Main Content
          <div className="flex gap-6">
            {/* Sidebar - Fixed width */}
            <aside className="w-80 space-y-4">
              <SetupAnalysis
                allergies={allergies}
                setAllergies={setAllergies}
                uploadedImage={uploadedImage}
                onImageUpload={handleImageUpload}
                onRemoveImage={handleRemoveImage}
                onAnalyze={analyzeIngredients}
                isAnalyzing={isAnalyzing}
              />
            </aside>

            {/* Main content area */}
            <main className="flex-1">
              <Card className="p-4" data-testid="results-card">
                <Typography variant="h6" className="mb-3" style={{ color: 'var(--foreground)' }}>
                  Analysis <span style={{ color: 'var(--secondary)' }}>Results</span>
                </Typography>

                {isAnalyzing ? (
                  <div className="text-center py-12">
                    <CircularProgress size={48} sx={{ color: 'var(--accent)', mb: 3 }} />
                    <Typography
                      variant="h6"
                      className="mb-2"
                      style={{ color: 'var(--foreground)' }}
                    >
                      Analyzing ingredients...
                    </Typography>
                    <Typography variant="body2" style={{ color: 'var(--muted)' }}>
                      This may take a moment
                    </Typography>
                  </div>
                ) : results ? (
                  <div>
                    {/* Product Information */}
                    {(results.food_name !== 'Unknown Product' ||
                      results.food_brand !== 'Unknown Brand') && (
                      <div
                        className="mb-6 p-4 rounded-lg"
                        style={{
                          backgroundColor: 'var(--surface)',
                          border: '1px solid var(--border)',
                        }}
                      >
                        <Typography
                          variant="h6"
                          className="font-semibold mb-2"
                          style={{ color: 'var(--foreground)' }}
                        >
                          Product Information
                        </Typography>
                        {results.food_brand !== 'Unknown Brand' && (
                          <Typography
                            variant="body1"
                            className="mb-1"
                            style={{ color: 'var(--muted)' }}
                          >
                            <strong>Brand:</strong> {results.food_brand}
                          </Typography>
                        )}
                        {results.food_name !== 'Unknown Product' && (
                          <Typography variant="body1" style={{ color: 'var(--muted)' }}>
                            <strong>Product:</strong> {results.food_name}
                          </Typography>
                        )}
                      </div>
                    )}

                    {/* Compact Safety Status */}
                    <div className="flex items-center gap-3 mb-6">
                      <Chip
                        icon={
                          results.safe ? (
                            <CheckCircle className="h-5 w-5" />
                          ) : (
                            <AlertTriangle className="h-5 w-5" />
                          )
                        }
                        label={results.safe ? 'SAFE TO CONSUME' : 'CONTAINS ALLERGENS'}
                        color={results.safe ? 'success' : 'error'}
                        variant="filled"
                        sx={{ fontSize: '0.875rem', height: 32 }}
                      />
                      <Typography variant="body1" style={{ color: 'var(--muted)' }}>
                        {results.detected_allergens.length} allergen
                        {results.detected_allergens.length !== 1 ? 's' : ''} detected
                      </Typography>
                    </div>

                    {/* Tabbed Results for Desktop */}
                    <Box sx={{ borderBottom: 1, borderColor: 'var(--border)' }}>
                      <Tabs
                        value={activeTab}
                        onChange={(_, newValue) => setActiveTab(newValue)}
                        textColor="inherit"
                        indicatorColor="primary"
                      >
                        <Tab
                          label="Safety Overview"
                          sx={{ color: 'var(--foreground)', textTransform: 'none' }}
                        />
                        <Tab
                          label="All Ingredients"
                          sx={{ color: 'var(--foreground)', textTransform: 'none' }}
                        />
                        <Tab
                          label="Detailed Analysis"
                          sx={{ color: 'var(--foreground)', textTransform: 'none' }}
                        />
                      </Tabs>
                    </Box>

                    <TabPanel value={activeTab} index={0}>
                      {/* Safety Overview */}
                      <div className="space-y-6">
                        {results.detected_allergens.length > 0 && (
                          <div>
                            <Typography variant="h6" color="error" className="mb-2 font-semibold">
                              ⚠️ Detected Allergens
                            </Typography>
                            <div className="flex flex-wrap gap-2">
                              {results.detected_allergens.map(allergen => (
                                <Chip
                                  key={allergen}
                                  label={allergen}
                                  color="error"
                                  variant="filled"
                                />
                              ))}
                            </div>
                          </div>
                        )}
                        {results.potential_allergens.length > 0 && (
                          <div>
                            <Typography variant="h6" color="warning" className="mb-2 font-semibold">
                              ⚡ Potential Allergens
                            </Typography>
                            <div className="flex flex-wrap gap-2">
                              {results.potential_allergens.map(allergen => (
                                <Chip
                                  key={allergen}
                                  label={allergen}
                                  color="warning"
                                  variant="filled"
                                />
                              ))}
                            </div>
                          </div>
                        )}
                        {results.safe_ingredients.length > 0 && (
                          <div>
                            <Typography variant="h6" color="success" className="mb-2 font-semibold">
                              ✅ Safe Ingredients ({results.safe_ingredients.length})
                            </Typography>
                            <Typography variant="body2" style={{ color: 'var(--muted)' }}>
                              {results.safe_ingredients.slice(0, 5).join(', ')}
                              {results.safe_ingredients.length > 5 &&
                                ` and ${results.safe_ingredients.length - 5} more...`}
                            </Typography>
                          </div>
                        )}
                      </div>
                    </TabPanel>

                    <TabPanel value={activeTab} index={1}>
                      {/* All Ingredients */}
                      <div className="space-y-4">
                        <div className="flex flex-wrap gap-2 mb-4">
                          {results.ingredients.map(ingredient => {
                            // Determine the color based on which category the ingredient is in
                            let chipColor: 'success' | 'warning' | 'error' | 'default' = 'default';
                            let chipVariant: 'filled' | 'outlined' = 'outlined';

                            if (results.safe_ingredients.includes(ingredient)) {
                              chipColor = 'success';
                            } else if (results.warning_ingredients.includes(ingredient)) {
                              chipColor = 'warning';
                            } else if (results.unsafe_ingredients.includes(ingredient)) {
                              chipColor = 'error';
                              chipVariant = 'filled';
                            }

                            return (
                              <Chip
                                key={ingredient}
                                label={ingredient}
                                size="small"
                                color={chipColor}
                                variant={chipVariant}
                              />
                            );
                          })}
                        </div>

                        {/* Categorized breakdown */}
                        {results.unsafe_ingredients.length > 0 && (
                          <div>
                            <Typography
                              variant="subtitle2"
                              color="error"
                              className="mb-2 font-semibold"
                            >
                              ⚠️ Unsafe for Your Allergies ({results.unsafe_ingredients.length})
                            </Typography>
                            <div className="flex flex-wrap gap-1">
                              {results.unsafe_ingredients.map(ingredient => (
                                <Chip
                                  key={ingredient}
                                  label={ingredient}
                                  size="small"
                                  color="error"
                                  variant="filled"
                                />
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </TabPanel>

                    <TabPanel value={activeTab} index={2}>
                      {/* Detailed Analysis */}
                      <Typography
                        variant="body1"
                        style={{ color: 'var(--foreground)', lineHeight: 1.7 }}
                      >
                        {results.analysis}
                      </Typography>
                    </TabPanel>
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <Shield
                      className="h-20 w-20 mx-auto mb-4 opacity-20"
                      style={{ color: 'var(--muted)' }}
                    />
                    <Typography variant="h6" className="mb-2" style={{ color: 'var(--muted)' }}>
                      Ready to Analyze
                    </Typography>
                    <Typography variant="body2" style={{ color: 'var(--muted)' }}>
                      Upload a food label photo and enter your allergies to get started
                    </Typography>
                  </div>
                )}
              </Card>
            </main>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
