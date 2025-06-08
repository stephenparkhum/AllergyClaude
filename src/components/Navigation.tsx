'use client';

import {
  Button,
  useTheme,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
} from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import { HelpCircle } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import NoSSR from './NoSSR';
import ThemeToggle from './ThemeToggle';
import { siteData } from '@/lib/siteData';

export default function Navigation() {
  const pathname = usePathname();
  const isHomePage = pathname === '/';
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <nav
        className="border-b border-opacity-10 mb-8"
        style={{ borderColor: 'var(--border)' }}
        data-testid="navigation"
      >
        <div className="max-w-7xl mx-auto px-6 py-6">
          {isMobile ? (
            // Mobile Layout
            <div className="flex flex-col">
              <div className="flex justify-between items-center mb-4">
                <div className="flex-1" />
                <IconButton
                  onClick={() => setMobileMenuOpen(true)}
                  aria-label="Open menu"
                  data-testid="mobile-menu-button"
                  sx={{ color: 'var(--foreground)' }}
                >
                  <MenuIcon />
                </IconButton>
              </div>
              <div className="text-center">
                <Link href="/" className="block">
                  <h1
                    className="text-2xl font-semibold tracking-tight"
                    data-testid="nav-title"
                    style={{
                      color: 'var(--foreground)',
                      transition: 'color 0.2s ease',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'var(--foreground)')}
                  >
                    {siteData.name}
                  </h1>
                </Link>
                <p
                  className="text-sm mt-2"
                  data-testid="nav-description"
                  style={{ color: 'var(--muted)' }}
                >
                  {isHomePage ? siteData.tagline : 'AI-powered food allergy detection'}
                </p>
              </div>
            </div>
          ) : (
            // Desktop Layout
            <div className="flex justify-between items-center">
              <div>
                <Link href="/" className="block">
                  <h1
                    className="text-3xl font-semibold tracking-tight"
                    data-testid="nav-title"
                    style={{
                      color: 'var(--foreground)',
                      transition: 'color 0.2s ease',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'var(--foreground)')}
                  >
                    {siteData.name}
                  </h1>
                </Link>
                <p
                  className="text-sm mt-1"
                  data-testid="nav-description"
                  style={{ color: 'var(--muted)' }}
                >
                  {isHomePage ? siteData.tagline : 'AI-powered food allergy detection'}
                </p>
              </div>
              <div className="flex items-center gap-4">
                {isHomePage ? (
                  <Link href="/how-to">
                    <Button
                      variant="outlined"
                      startIcon={<HelpCircle className="h-4 w-4" />}
                      data-testid="how-to-nav-button"
                      aria-label="Learn how to use Allergy Agents"
                      sx={{
                        borderColor: 'var(--border)',
                        color: 'var(--foreground)',
                        borderRadius: 'calc(var(--radius) - 2px)',
                        textTransform: 'none',
                        fontWeight: 500,
                        '&:hover': {
                          borderColor: 'var(--accent)',
                          backgroundColor: 'transparent',
                          color: 'var(--accent)',
                        },
                      }}
                    >
                      How to Use
                    </Button>
                  </Link>
                ) : (
                  <Link href="/">
                    <Button
                      variant="outlined"
                      data-testid="home-nav-button"
                      aria-label="Go back to main dashboard"
                      sx={{
                        borderColor: 'var(--border)',
                        color: 'var(--foreground)',
                        borderRadius: 'calc(var(--radius) - 2px)',
                        textTransform: 'none',
                        fontWeight: 500,
                        '&:hover': {
                          borderColor: 'var(--accent)',
                          backgroundColor: 'transparent',
                          color: 'var(--accent)',
                        },
                      }}
                    >
                      Back to Dashboard
                    </Button>
                  </Link>
                )}
                <NoSSR fallback={<div className="w-10 h-10" />}>
                  <ThemeToggle />
                </NoSSR>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      <Drawer
        anchor="right"
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        data-testid="mobile-menu-drawer"
      >
        <div className="w-64 p-4">
          <List>
            <ListItem>
              <div className="flex items-center justify-between w-full">
                <ListItemText primary="Theme" />
                <NoSSR fallback={<div className="w-10 h-10" />}>
                  <ThemeToggle />
                </NoSSR>
              </div>
            </ListItem>
            <ListItem>
              {isHomePage ? (
                <Link href="/how-to" className="w-full" onClick={() => setMobileMenuOpen(false)}>
                  <Button
                    variant="outlined"
                    startIcon={<HelpCircle className="h-4 w-4" />}
                    className="font-source-sans-pro w-full"
                    data-testid="mobile-how-to-button"
                  >
                    How to Use
                  </Button>
                </Link>
              ) : (
                <Link href="/" className="w-full" onClick={() => setMobileMenuOpen(false)}>
                  <Button
                    variant="outlined"
                    className="font-source-sans-pro w-full"
                    data-testid="mobile-home-button"
                  >
                    Back to Dashboard
                  </Button>
                </Link>
              )}
            </ListItem>
          </List>
        </div>
      </Drawer>
    </>
  );
}
