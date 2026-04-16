"use client";

import React from "react";
import { HeroParallax } from "@/components/ui/hero-parallax";

export function Hero() {
  return <HeroParallax products={products} />;
}

const products = [
  {
    title: "Project Alpha",
    link: "#",
    thumbnail:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1472&auto=format&fit=crop",
  },
  {
    title: "Fintech Dashboard",
    link: "#",
    thumbnail:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1515&auto=format&fit=crop",
  },
  {
    title: "E-Commerce",
    link: "#",
    thumbnail:
      "https://images.unsplash.com/photo-1555421689-491a97ff2040?q=80&w=1470&auto=format&fit=crop",
  },
  {
    title: "AI Automation",
    link: "#",
    thumbnail:
      "https://images.unsplash.com/photo-1620712948343-0056901923e4?q=80&w=1525&auto=format&fit=crop",
  },
  {
    title: "SaaS Platform",
    link: "#",
    thumbnail:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1470&auto=format&fit=crop",
  },
  {
    title: "Marketing Website",
    link: "#",
    thumbnail:
      "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?q=80&w=1470&auto=format&fit=crop",
  },
  {
    title: "Mobile App",
    link: "#",
    thumbnail:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1470&auto=format&fit=crop",
  },
  {
    title: "Developer Tools",
    link: "#",
    thumbnail:
      "https://images.unsplash.com/photo-1504639725590-34d0984388bd?q=80&w=1374&auto=format&fit=crop",
  },
  {
    title: "Brand Identity",
    link: "#",
    thumbnail:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1470&auto=format&fit=crop",
  },
  {
    title: "Cloud Infrastructure",
    link: "#",
    thumbnail:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1472&auto=format&fit=crop",
  },
  {
    title: "Creative Studio",
    link: "#",
    thumbnail:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1470&auto=format&fit=crop",
  },
  {
    title: "Modern Healthcare",
    link: "#",
    thumbnail:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1470&auto=format&fit=crop",
  },
  {
    title: "Real Estate Portal",
    link: "#",
    thumbnail:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1470&auto=format&fit=crop",
  },
  {
    title: "Logistics Dashboard",
    link: "#",
    thumbnail:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1470&auto=format&fit=crop",
  },
  {
    title: "Web3 Protocol",
    link: "#",
    thumbnail:
      "https://images.unsplash.com/photo-1639762681485-074b7f4ec651?q=80&w=1632&auto=format&fit=crop",
  },
];
