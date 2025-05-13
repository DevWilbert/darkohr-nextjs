import React from "react";
import { Container } from "@/components/Container";
import { notFound } from "next/navigation";
import FeaturePage from "@/pages/FeaturePage";
import AboutPage from "@/pages/AboutPage";
import BlogPage from "@/pages/BlogPage";
import SupportPage from "@/pages/SupportPage";
import DocsPage from "@/pages/DocsPage";

// Define interface for component props
interface PageComponentProps {
  locale: string;
}

// Define the type for page components
type PageComponent = React.ComponentType<PageComponentProps>;

// Interface for locale-specific route mappings
interface RouteMap {
  [key: string]: PageComponent;
}

// Interface for all locale mappings
interface LocaleRouteMap {
  [locale: string]: RouteMap;
}

// Define page mappings for each locale
const PAGE_MAPPINGS: LocaleRouteMap = {
  'id': {
    'fitur': FeaturePage,
    'tentang': AboutPage,
    'blog': BlogPage,
    'support': SupportPage,
    'docs' : DocsPage,
    // add other mappings as needed
  },
  'en': {
    'features': FeaturePage,
    'about': AboutPage,
    'blogs': BlogPage,
    'support': SupportPage,
    'docs' : DocsPage,
    // add other mappings as needed
  }
};

export default async function DynamicPage({
  params
}: {
  params: { locale: string; slug: string }
}) {
  const { locale, slug } = params;
  
  // If no slug, show 404 page
  if (!slug) {
    notFound();
  }
  
  // Check if the locale exists in our mappings
  if (!PAGE_MAPPINGS[locale]) {
    notFound();
  }
  
  // Safely access the component using the slug
  const PageComponent = PAGE_MAPPINGS[locale][slug];
  
  // If no matching component, show 404 page
  if (!PageComponent) {
    notFound();
  }
  
  // Render page component with locale
  return (
    <Container>
      <PageComponent locale={locale} />
    </Container>
  );
}

// For static generation
export async function generateStaticParams() {
  // Create array for all possible locale and slug combinations
  const routes = [
    // Specific page routes
    { locale: 'id', slug: 'fitur' },
    { locale: 'en', slug: 'features' },
    { locale: 'id', slug: 'tentang' },
    { locale: 'en', slug: 'about' },
    // Add other routes as needed
  ];
  
  return routes;
}

