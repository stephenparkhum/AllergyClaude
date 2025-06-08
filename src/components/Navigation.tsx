"use client";

import { Card, CardContent, Button, Typography, useTheme, IconButton, Drawer, List, ListItem, ListItemText, useMediaQuery } from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import { HelpCircle } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import NoSSR from "./NoSSR";
import ThemeToggle from "./ThemeToggle";
import { siteData } from "@/lib/siteData";

export default function Navigation() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <Card className="mb-8 shadow-lg" data-testid="navigation">
        <CardContent className="p-6">
          {isMobile ? (
            // Mobile Layout
            <div className="flex flex-col">
              <div className="flex justify-between items-center mb-2">
                <div className="flex-1" />
                <IconButton
                  onClick={() => setMobileMenuOpen(true)}
                  aria-label="Open menu"
                  data-testid="mobile-menu-button"
                >
                  <MenuIcon />
                </IconButton>
              </div>
              <div className="text-center">
                <Link href="/" className="block">
                  <Typography
                    variant="h4"
                    component="h1"
                    className="font-playfair"
                    data-testid="nav-title"
                    sx={{
                      fontWeight: 'bold',
                      color: theme.palette.text.primary,
                      transition: 'color 0.2s ease',
                      '&:hover': {
                        color: theme.palette.primary.main,
                      },
                    }}
                  >
                    {siteData.name.toUpperCase()}
                  </Typography>
                </Link>
                <Typography
                  variant="body2"
                  className="font-source-sans-pro mt-1"
                  data-testid="nav-description"
                  color="text.secondary"
                >
                  {isHomePage ? siteData.tagline : "AI-powered food allergy detection"}
                </Typography>
              </div>
            </div>
          ) : (
            // Desktop Layout
            <div className="flex justify-between items-center">
              <div>
                <Link href="/" className="block">
                  <Typography
                    variant="h3"
                    component="h1"
                    className="font-playfair"
                    data-testid="nav-title"
                    sx={{
                      fontWeight: 'bold',
                      color: theme.palette.text.primary,
                      transition: 'color 0.2s ease',
                      '&:hover': {
                        color: theme.palette.primary.main,
                      },
                    }}
                  >
                    {siteData.name.toUpperCase()}
                  </Typography>
                </Link>
                <Typography
                  variant="body2"
                  className="font-source-sans-pro mt-2"
                  data-testid="nav-description"
                  color="text.secondary"
                >
                  {isHomePage ? siteData.tagline : "AI-powered food allergy detection"}
                </Typography>
              </div>
              <div className="flex items-center gap-3">
                {isHomePage ? (
                  <Link href="/how-to">
                    <Button
                      variant="outlined"
                      startIcon={<HelpCircle className="h-4 w-4" />}
                      className="font-source-sans-pro"
                      data-testid="how-to-nav-button"
                      aria-label="Learn how to use Allergy Agents"
                    >
                      How to Use
                    </Button>
                  </Link>
                ) : (
                  <Link href="/">
                    <Button
                      variant="outlined"
                      className="font-source-sans-pro"
                      data-testid="home-nav-button"
                      aria-label="Go back to main dashboard"
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
        </CardContent>
      </Card>

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