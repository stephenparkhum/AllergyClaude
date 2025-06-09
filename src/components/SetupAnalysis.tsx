'use client';

import {
  Button,
  TextField,
  Typography,
  Card,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { RefreshCw } from 'lucide-react';
import Image from 'next/image';
import ImageUpload from '@/components/ImageUpload';

interface SetupAnalysisProps {
  allergies: string;
  setAllergies: (allergies: string) => void;
  uploadedImage: string | null;
  onImageUpload: (imageData: string) => void;
  onRemoveImage: () => void;
  onAnalyze: () => void;
  isAnalyzing: boolean;
}

export default function SetupAnalysis({
  allergies,
  setAllergies,
  uploadedImage,
  onImageUpload,
  onRemoveImage,
  onAnalyze,
  isAnalyzing,
}: SetupAnalysisProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));

  if (isMobile) {
    return (
      <Card className="p-6" data-testid="input-card" elevation={2}>
        <Typography variant="h5" className="mb-4 font-semibold" style={{ color: 'var(--foreground)' }}>
          Setup <span style={{ color: 'var(--secondary)' }}>Analysis</span>
        </Typography>

        {/* Allergies Input */}
        <div className="mb-8">
          <TextField
            label="Known allergies"
            placeholder="peanuts, shellfish, dairy... (separate with commas)"
            value={allergies}
            onChange={e => setAllergies(e.target.value)}
            multiline
            rows={3}
            fullWidth
            size="medium"
            variant="outlined"
            data-testid="allergies-input"
            sx={{
              '& .MuiOutlinedInput-root': {
                backgroundColor: 'var(--surface)',
                '& fieldset': { borderColor: 'var(--border)' },
                '&:hover fieldset': { borderColor: 'var(--accent)' },
                '&.Mui-focused fieldset': { borderColor: 'var(--accent)' },
              },
              '& .MuiInputLabel-root': { color: 'var(--muted)' },
              '& .MuiInputBase-input': { color: 'var(--foreground)' },
            }}
          />
        </div>

        {/* Image Upload and Preview */}
        <div className="mb-8">
          <Typography
            variant="subtitle1"
            className="mb-3 font-medium"
            style={{ color: 'var(--foreground)' }}
          >
            Food Label Photo
          </Typography>
          {uploadedImage ? (
            <div className="space-y-3">
              <div
                className="relative w-full h-40 rounded-lg overflow-hidden"
                style={{ backgroundColor: 'var(--background)' }}
              >
                <Image
                  src={uploadedImage}
                  alt="Uploaded photo"
                  fill
                  className="object-cover"
                />
              </div>
              <Button
                size="large"
                onClick={onRemoveImage}
                startIcon={<RefreshCw className="h-4 w-4" />}
                fullWidth
                variant="outlined"
              >
                Upload Different Image
              </Button>
            </div>
          ) : (
            <ImageUpload onImageUpload={onImageUpload} />
          )}
        </div>

        {/* Analyze Button */}
        <Button
          variant="contained"
          color="primary"
          onClick={onAnalyze}
          disabled={!uploadedImage || !allergies.trim() || isAnalyzing}
          fullWidth
          size="large"
          data-testid="analyze-button"
          sx={{
            textTransform: 'none',
            fontWeight: 600,
            fontSize: '1.2rem',
            py: 2,
          }}
        >
          {isAnalyzing ? 'Analyzing...' : 'Analyze Ingredients'}
        </Button>
      </Card>
    );
  }

  // Desktop Layout
  return (
    <Card className="p-4 sticky top-4" data-testid="sidebar-card">
      <Typography variant="h6" className="mb-3" style={{ color: 'var(--foreground)' }}>
        Setup <span style={{ color: 'var(--secondary)' }}>Analysis</span>
      </Typography>

      {/* Compact allergies input */}
      <div className="mb-6">
        <TextField
          label="Known Allergies"
          placeholder="peanuts, dairy, gluten... (separate with commas)"
          value={allergies}
          onChange={e => setAllergies(e.target.value)}
          size="small"
          fullWidth
          multiline
          rows={3}
          variant="outlined"
          data-testid="allergies-input"
          sx={{
            '& .MuiOutlinedInput-root': {
              backgroundColor: 'var(--surface)',
              '& fieldset': { borderColor: 'var(--border)' },
              '&:hover fieldset': { borderColor: 'var(--accent)' },
              '&.Mui-focused fieldset': { borderColor: 'var(--accent)' },
            },
            '& .MuiInputLabel-root': { color: 'var(--muted)' },
            '& .MuiInputBase-input': { color: 'var(--foreground)' },
          }}
        />
      </div>

      {/* Compact inline upload and preview */}
      <div className="mb-6">
        <Typography
          variant="subtitle2"
          className="mb-2"
          style={{ color: 'var(--foreground)' }}
        >
          Food Label Photo
        </Typography>
        {uploadedImage ? (
          <div className="space-y-2">
            <div
              className="relative w-full h-40 rounded-lg overflow-hidden"
              style={{ backgroundColor: 'var(--background)' }}
            >
              <Image
                src={uploadedImage}
                alt="Uploaded photo"
                fill
                className="object-cover"
              />
            </div>
            <Button
              size="small"
              onClick={onRemoveImage}
              startIcon={<RefreshCw className="h-4 w-4" />}
              fullWidth
              variant="outlined"
              sx={{
                borderColor: 'var(--border)',
                color: 'var(--foreground)',
                textTransform: 'none',
                '&:hover': { borderColor: 'var(--accent)', color: 'var(--accent)' },
              }}
            >
              Upload Different Image
            </Button>
          </div>
        ) : (
          <ImageUpload onImageUpload={onImageUpload} />
        )}
      </div>

      {/* Analyze button */}
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={onAnalyze}
        disabled={!uploadedImage || !allergies.trim() || isAnalyzing}
        data-testid="analyze-button"
        sx={{
          textTransform: 'none',
          fontWeight: 500,
        }}
      >
        {isAnalyzing ? 'Analyzing...' : 'Analyze Ingredients'}
      </Button>
    </Card>
  );
}