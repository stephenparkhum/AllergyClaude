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
} from '@mui/material';
import { Shield, CheckCircle, AlertTriangle } from 'lucide-react';

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

interface AnalysisResults {
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
}

interface AnalysisResultsCardProps {
  results: AnalysisResults | null;
  isAnalyzing: boolean;
  isMobile: boolean;
}

export default function AnalysisResultsCard({
  results,
  isAnalyzing,
  isMobile,
}: AnalysisResultsCardProps) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <Card className="p-4" data-testid="results-card">
      <Typography variant="h6" className="mb-3" style={{ color: 'var(--foreground)' }}>
        {isMobile ? 'Results' : 'Analysis Results'}
      </Typography>

      {isAnalyzing ? (
        <div className={`text-center ${isMobile ? 'py-8' : 'py-12'}`}>
          <CircularProgress size={isMobile ? 32 : 48} sx={{ color: 'var(--accent)', mb: isMobile ? 2 : 3 }} />
          <Typography
            variant={isMobile ? 'body2' : 'h6'}
            className={isMobile ? '' : 'mb-2'}
            style={{ color: 'var(--foreground)' }}
          >
            Analyzing ingredients...
          </Typography>
          {!isMobile && (
            <Typography variant="body2" style={{ color: 'var(--muted)' }}>
              This may take a moment
            </Typography>
          )}
        </div>
      ) : results ? (
        <div>
          {/* Product Information */}
          {(results.food_name !== 'Unknown Product' || results.food_brand !== 'Unknown Brand') && (
            <div
              className={`${isMobile ? 'mb-4 p-3' : 'mb-6 p-4'} rounded-lg`}
              style={{
                backgroundColor: 'var(--surface)',
                border: '1px solid var(--border)',
              }}
            >
              <Typography
                variant={isMobile ? 'subtitle2' : 'h6'}
                className={`font-semibold ${isMobile ? 'mb-1' : 'mb-2'}`}
                style={{ color: 'var(--foreground)' }}
              >
                Product Information
              </Typography>
              {results.food_brand !== 'Unknown Brand' && (
                <Typography
                  variant={isMobile ? 'body2' : 'body1'}
                  className={isMobile ? '' : 'mb-1'}
                  style={{ color: 'var(--muted)' }}
                >
                  <strong>Brand:</strong> {results.food_brand}
                </Typography>
              )}
              {results.food_name !== 'Unknown Product' && (
                <Typography variant={isMobile ? 'body2' : 'body1'} style={{ color: 'var(--muted)' }}>
                  <strong>Product:</strong> {results.food_name}
                </Typography>
              )}
            </div>
          )}

          {/* Compact Safety Status */}
          <div className={`flex items-center ${isMobile ? 'gap-2 mb-4' : 'gap-3 mb-6'}`}>
            <Chip
              icon={
                results.safe ? (
                  <CheckCircle className={isMobile ? 'h-4 w-4' : 'h-5 w-5'} />
                ) : (
                  <AlertTriangle className={isMobile ? 'h-4 w-4' : 'h-5 w-5'} />
                )
              }
              label={results.safe ? (isMobile ? 'SAFE' : 'SAFE TO CONSUME') : 'CONTAINS ALLERGENS'}
              color={results.safe ? 'success' : 'error'}
              variant="filled"
              size={isMobile ? 'small' : undefined}
              sx={isMobile ? {} : { fontSize: '0.875rem', height: 32 }}
            />
            <Typography variant={isMobile ? 'body2' : 'body1'} style={{ color: 'var(--muted)' }}>
              {results.detected_allergens.length} allergen{results.detected_allergens.length !== 1 ? 's' : ''} detected
            </Typography>
          </div>

          {/* Tabbed Results */}
          <Box sx={{ borderBottom: 1, borderColor: 'var(--border)' }}>
            <Tabs
              value={activeTab}
              onChange={(_, newValue) => setActiveTab(newValue)}
              variant={isMobile ? 'fullWidth' : undefined}
              textColor="inherit"
              indicatorColor="primary"
            >
              <Tab
                label={isMobile ? 'Safety' : 'Safety Overview'}
                sx={{
                  color: 'var(--foreground)',
                  minHeight: isMobile ? 40 : undefined,
                  textTransform: 'none',
                }}
              />
              <Tab
                label={isMobile ? 'Ingredients' : 'All Ingredients'}
                sx={{
                  color: 'var(--foreground)',
                  minHeight: isMobile ? 40 : undefined,
                  textTransform: 'none',
                }}
              />
              <Tab
                label={isMobile ? 'Analysis' : 'Detailed Analysis'}
                sx={{
                  color: 'var(--foreground)',
                  minHeight: isMobile ? 40 : undefined,
                  textTransform: 'none',
                }}
              />
            </Tabs>
          </Box>

          <TabPanel value={activeTab} index={0}>
            {/* Safety Tab - Detected Allergens */}
            <div className={isMobile ? 'space-y-4' : 'space-y-6'}>
              {results.detected_allergens.length > 0 && (
                <div>
                  <Typography
                    variant={isMobile ? 'caption' : 'h6'}
                    color="error"
                    className={`font-semibold ${isMobile ? '' : 'mb-2'}`}
                  >
                    {isMobile ? 'DETECTED ALLERGENS:' : '⚠️ Detected Allergens'}
                  </Typography>
                  <div className={`flex flex-wrap ${isMobile ? 'gap-1 mt-1' : 'gap-2'}`}>
                    {results.detected_allergens.map(allergen => (
                      <Chip
                        key={allergen}
                        label={allergen}
                        size={isMobile ? 'small' : undefined}
                        color="error"
                        variant="filled"
                      />
                    ))}
                  </div>
                </div>
              )}
              {results.potential_allergens.length > 0 && (
                <div>
                  <Typography
                    variant={isMobile ? 'caption' : 'h6'}
                    color="warning"
                    className={`font-semibold ${isMobile ? '' : 'mb-2'}`}
                  >
                    {isMobile ? 'POTENTIAL ALLERGENS:' : '⚡ Potential Allergens'}
                  </Typography>
                  <div className={`flex flex-wrap ${isMobile ? 'gap-1 mt-1' : 'gap-2'}`}>
                    {results.potential_allergens.map(allergen => (
                      <Chip
                        key={allergen}
                        label={allergen}
                        size={isMobile ? 'small' : undefined}
                        color="warning"
                        variant="filled"
                      />
                    ))}
                  </div>
                </div>
              )}
              {!isMobile && results.safe_ingredients.length > 0 && (
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
            {/* Ingredients Tab */}
            <div className="space-y-4">
              <div className={`flex flex-wrap gap-2 ${isMobile ? 'mb-4' : ''}`}>
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
                  <Typography
                    variant={isMobile ? 'caption' : 'subtitle2'}
                    color="error"
                    className="mb-2 font-semibold"
                  >
                    ⚠️ {isMobile ? 'UNSAFE INGREDIENTS:' : `Unsafe for Your Allergies (${results.unsafe_ingredients.length})`}
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
            {/* Analysis Tab */}
            <Typography
              variant={isMobile ? 'body2' : 'body1'}
              style={{ color: 'var(--foreground)', lineHeight: isMobile ? 1.6 : 1.7 }}
            >
              {results.analysis}
            </Typography>
          </TabPanel>
        </div>
      ) : (
        <div className={`text-center ${isMobile ? 'py-8' : 'py-16'}`}>
          <Shield
            className={`${isMobile ? 'h-12 w-12' : 'h-20 w-20'} mx-auto ${isMobile ? 'mb-3' : 'mb-4'} opacity-20`}
            style={{ color: 'var(--muted)' }}
          />
          <Typography
            variant={isMobile ? 'body2' : 'h6'}
            className={isMobile ? '' : 'mb-2'}
            style={{ color: 'var(--muted)' }}
          >
            {isMobile ? 'Upload an image to begin analysis' : 'Ready to Analyze'}
          </Typography>
          {!isMobile && (
            <Typography variant="body2" style={{ color: 'var(--muted)' }}>
              Upload a food label photo and enter your allergies to get started
            </Typography>
          )}
        </div>
      )}
    </Card>
  );
}