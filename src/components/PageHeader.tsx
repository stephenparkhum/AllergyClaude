"use client";

import { siteData } from "@/lib/siteData";

interface PageHeaderProps {
  title?: string;
  subtitle?: string;
  showSiteName?: boolean;
  className?: string;
}

export default function PageHeader({ 
  title, 
  subtitle, 
  showSiteName = false,
  className = "" 
}: PageHeaderProps) {
  const displayTitle = title || (showSiteName ? siteData.name : undefined);
  const displaySubtitle = subtitle || (showSiteName ? siteData.tagline : undefined);

  if (!displayTitle && !displaySubtitle) {
    return null;
  }

  return (
    <div className={`text-center mb-12 ${className}`} data-testid="page-header">
      {displayTitle && (
        <h1 
          className="text-4xl md:text-5xl font-semibold mb-4" 
          style={{ color: 'var(--foreground)' }}
          data-testid="page-title"
        >
          {displayTitle}
        </h1>
      )}
      {displaySubtitle && (
        <p 
          className="text-lg md:text-xl max-w-2xl mx-auto" 
          style={{ color: 'var(--muted)' }}
          data-testid="page-subtitle"
        >
          {displaySubtitle}
        </p>
      )}
    </div>
  );
}