import { Component, CreditCard, FileText, FormInput, GalleryHorizontal, Image, LayoutDashboard, List, Settings, Square, ToggleLeft, Type } from "lucide-react";


export const uiComponents = [
  {
    name: "Typography",
    icon: <Type size={18} />,
    category: "Basic",
  },
  {
    name: "Layout",
    icon: <LayoutDashboard size={18} />,
    category: "Structure",
  },
  {
    name: "Buttons",
    icon: <Square size={18} />,
    category: "Controls",
  },
  {
    name: "Components",
    icon: <Component size={18} />,
    category: "Advanced",
  },
  {
    name: "Toggles",
    icon: <ToggleLeft size={18} />,
    category: "Controls",
  },
  {
    name: "Inputs",
    icon: <FormInput size={18} />,
    category: "Forms",
  },
  {
    name: "Images",
    icon: <Image size={18} />,
    category: "Media",
  },
  {
    name: "Lists",
    icon: <List size={18} />,
    category: "Content",
  },
  {
    name: "Forms",
    icon: <FileText size={18} />,
    category: "Forms",
  },
  {
    name: "Cards",
    icon: <CreditCard size={18} />,
    category: "Content",
  },
  {
    name: "Gallery",
    icon: <GalleryHorizontal size={18} />,
    category: "Media",
  },
  {
    name: "Settings",
    icon: <Settings size={18} />,
    category: "Advanced",
  },
];
