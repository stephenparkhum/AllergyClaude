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
        style={{ 
          backgroundColor: theme.palette.primary.main,
          borderColor: 'rgba(255, 255, 255, 0.2)'
        }}
        data-testid="navigation"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-6">
          {isMobile ? (
            // Mobile Layout
            <div className="flex flex-row justify-between items-center">
              <Link href="/" className="flex-1">
                <h1
                  className="text-xl font-semibold tracking-tight"
                  data-testid="nav-title"
                  style={{
                    color: 'white',
                    transition: 'color 0.2s ease',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255, 255, 255, 0.8)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'white')}
                >
                  {siteData.name}
                </h1>
              </Link>
              <IconButton
                onClick={() => setMobileMenuOpen(true)}
                aria-label="Open menu"
                data-testid="mobile-menu-button"
                sx={{ color: 'white' }}
              >
                <MenuIcon />
              </IconButton>
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
                      color: 'white',
                      transition: 'color 0.2s ease',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255, 255, 255, 0.8)')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'white')}
                  >
                    {siteData.name}
                  </h1>
                </Link>
                <p
                  className="text-sm mt-1"
                  data-testid="nav-description"
                  style={{ color: 'rgba(255, 255, 255, 0.8)' }}
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
                        borderColor: 'rgba(255, 255, 255, 0.3)',
                        color: 'white',
                        borderRadius: 'calc(var(--radius) - 2px)',
                        textTransform: 'none',
                        fontWeight: 500,
                        '&:hover': {
                          borderColor: 'white',
                          backgroundColor: 'rgba(255, 255, 255, 0.1)',
                          color: 'white',
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
                        borderColor: 'rgba(255, 255, 255, 0.3)',
                        color: 'white',
                        borderRadius: 'calc(var(--radius) - 2px)',
                        textTransform: 'none',
                        fontWeight: 500,
                        '&:hover': {
                          borderColor: 'white',
                          backgroundColor: 'rgba(255, 255, 255, 0.1)',
                          color: 'white',
                        },
                      }}
                    >
                      Back to Dashboard
                    </Button>
                  </Link>
                )}
                <NoSSR fallback={<div className="w-10 h-10" />}>
                  <ThemeToggle iconColor="white" />
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
        <div className="w-72 p-6">
          <List>
            <ListItem sx={{ py: 2 }}>
              <div className="flex items-center justify-between w-full">
                <ListItemText primary="Theme" />
                <NoSSR fallback={<div className="w-10 h-10" />}>
                  <ThemeToggle />
                </NoSSR>
              </div>
            </ListItem>
            <ListItem sx={{ py: 2 }}>
              {isHomePage ? (
                <Link href="/how-to" className="w-full" onClick={() => setMobileMenuOpen(false)}>
                  <Button
                    variant="outlined"
                    startIcon={<HelpCircle className="h-4 w-4" />}
                    className="font-source-sans-pro w-full"
                    size="large"
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
                    size="large"
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
