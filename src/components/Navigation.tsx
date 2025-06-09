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
        className="sticky top-0 z-50 backdrop-blur-md"
        style={{ 
          backgroundColor: 'var(--surface)',
          borderBottom: '1px solid var(--border)',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        }}
        data-testid="navigation"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {isMobile ? (
            // Mobile Layout
            <div className="flex items-center justify-between h-16">
              <Link href="/" className="flex items-center">
                <h1
                  className="text-lg font-medium tracking-tight"
                  data-testid="nav-title"
                  style={{
                    color: 'var(--foreground)',
                    transition: 'color 0.2s ease',
                  }}
                >
                  Allergy <span style={{ color: 'var(--secondary)' }}>Agents</span>
                </h1>
              </Link>
              <IconButton
                onClick={() => setMobileMenuOpen(true)}
                aria-label="Open menu"
                data-testid="mobile-menu-button"
                sx={{ 
                  color: 'var(--foreground)',
                  '&:hover': {
                    backgroundColor: 'var(--accent-soft)',
                  }
                }}
              >
                <MenuIcon />
              </IconButton>
            </div>
          ) : (
            // Desktop Layout
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <Link href="/" className="flex items-center">
                  <h1
                    className="text-xl font-medium tracking-tight mr-8"
                    data-testid="nav-title"
                    style={{
                      color: 'var(--foreground)',
                      transition: 'color 0.2s ease',
                    }}
                  >
                    Allergy <span style={{ color: 'var(--secondary)' }}>Agents</span>
                  </h1>
                </Link>
                {isHomePage && (
                  <p
                    className="text-sm hidden lg:block"
                    data-testid="nav-description"
                    style={{ color: 'var(--muted)' }}
                  >
                    {siteData.tagline}
                  </p>
                )}
              </div>
              
              <div className="flex items-center gap-3">
                {isHomePage ? (
                  <Link href="/how-to">
                    <Button
                      variant="text"
                      startIcon={<HelpCircle className="h-4 w-4" />}
                      data-testid="how-to-nav-button"
                      aria-label="Learn how to use Allergy Agents"
                      sx={{
                        color: 'var(--foreground)',
                        borderRadius: 'calc(var(--radius) - 2px)',
                        textTransform: 'none',
                        fontWeight: 500,
                        px: 3,
                        py: 1,
                        '&:hover': {
                          backgroundColor: 'var(--accent-soft)',
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
                      variant="text"
                      data-testid="home-nav-button"
                      aria-label="Go back to main dashboard"
                      sx={{
                        color: 'var(--foreground)',
                        borderRadius: 'calc(var(--radius) - 2px)',
                        textTransform: 'none',
                        fontWeight: 500,
                        px: 3,
                        py: 1,
                        '&:hover': {
                          backgroundColor: 'var(--accent-soft)',
                          color: 'var(--accent)',
                        },
                      }}
                    >
                      Dashboard
                    </Button>
                  </Link>
                )}
                <div className="h-6 w-px mx-1" style={{ backgroundColor: 'var(--border)' }} />
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
        PaperProps={{
          sx: {
            backgroundColor: 'var(--surface)',
            color: 'var(--foreground)',
          }
        }}
      >
        <div className="w-80 p-6">
          <div className="mb-6">
            <h2 className="text-lg font-medium mb-2" style={{ color: 'var(--foreground)' }}>
              Menu
            </h2>
          </div>
          
          <List sx={{ p: 0 }}>
            <ListItem sx={{ px: 0, py: 2 }}>
              <div className="flex items-center justify-between w-full">
                <ListItemText 
                  primary="Theme" 
                  sx={{ '& .MuiListItemText-primary': { color: 'var(--foreground)' } }}
                />
                <NoSSR fallback={<div className="w-10 h-10" />}>
                  <ThemeToggle />
                </NoSSR>
              </div>
            </ListItem>
            
            <ListItem sx={{ px: 0, py: 2 }}>
              <div className="w-full">
                {isHomePage ? (
                  <Link href="/how-to" className="w-full block" onClick={() => setMobileMenuOpen(false)}>
                    <Button
                      variant="text"
                      startIcon={<HelpCircle className="h-4 w-4" />}
                      fullWidth
                      size="large"
                      data-testid="mobile-how-to-button"
                      sx={{
                        color: 'var(--foreground)',
                        justifyContent: 'flex-start',
                        textTransform: 'none',
                        fontWeight: 500,
                        py: 1.5,
                        '&:hover': {
                          backgroundColor: 'var(--accent-soft)',
                          color: 'var(--accent)',
                        },
                      }}
                    >
                      How to Use
                    </Button>
                  </Link>
                ) : (
                  <Link href="/" className="w-full block" onClick={() => setMobileMenuOpen(false)}>
                    <Button
                      variant="text"
                      fullWidth
                      size="large"
                      data-testid="mobile-home-button"
                      sx={{
                        color: 'var(--foreground)',
                        justifyContent: 'flex-start',
                        textTransform: 'none',
                        fontWeight: 500,
                        py: 1.5,
                        '&:hover': {
                          backgroundColor: 'var(--accent-soft)',
                          color: 'var(--accent)',
                        },
                      }}
                    >
                      Back to Dashboard
                    </Button>
                  </Link>
                )}
              </div>
            </ListItem>
          </List>
        </div>
      </Drawer>
    </>
  );
}