
# 🚀 Astro6k
[![Live Demo](https://img.shields.io/badge/demo-live-success)](https://astro6k.vercel.app)
[![Vercel](https://img.shields.io/badge/deployed%20on-Vercel-black?logo=vercel)](https://astro6k.vercel.app)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-Build-purple?logo=vite) 
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-06B6D4?logo=tailwindcss) 
![shadcn/ui](https://img.shields.io/badge/shadcn/ui-components-black)
![Licencse](https://img.shields.io/badge/license-MIT-blue)

Astro6k is a sports journalism platform and custom CMS built with React, TypeScript, and Supabase.

The platform allows writeers to create, edit, publish, and manage sports articles through a dedicated dashboard while providing readers with a responsive public-facing publication experience.

## **Overview**

Astro6k is built as a full-stack publishing platform focused on creating a modern writing and publishing workflow.

The project evolved from a static article frontend into a complete CMS featureing authentication, article management, rich text editing, media uploads, and public content delivery.

### 🎯 **Why Astro6k?**
Astro6k is built to explore the challenges of creating a modern sports publishing platform.

The goal is to create a system where writers can manage their own content while reader have a fast, clean experience for discovering sports coverage.

The project focuses on:
- Building a custom CMS workflow
- Managing authenticated user-generated content
- Designing scalable database permissions
- Creating a flexible rich text publishing system

### ✨ **Current Features**

#### **Publishing Platform**
- Public Homepage with featured article hero section
- League-based article filtering
- Public article pages
- Responsive navigation and mobile menu
- Article typography system for rich content
- Featured article management

#### **CMS Dashboard**
- Email/password authentication
- Protected dashboard and editor routes
- User profiles and profile settings
- Article creation and editing
- Draft and published article states
- Author-specific article management
- Rich text editor powered by TipTap
- Article Image uploads
- Save, publish, and update feedback notifications

#### **Backend & Security**
- Supabase authentication
- PostgreSQL database
- Row Level Security
- Supabase Storage image handling
- Database RPC functions for shared content state

### 🛠️ **Tech Stack**

#### **Front End**
- React 19
- TypeScript
- Vite
- Tailwind CSS 4
- shadcn/ui
- TipTap

#### **Back End**
- Supabase Auth
- Supabase PostgresQL DB

### 🏗️ **Architecture**
Astro6k uses a client-driven architecture powered by React and Supabase.
```
React Application
        |
        |
React Router
        |
        |
Supabase
 ├── Auth
 ├── PostgreSQL
 └── Storage
```

### 💡 **Technical Highlights**

#### **Row Level Security**

Implemented Supabase RLS policies to ensure users can only manage their own content.

#### **Featured Article System**

Built a database RPC function using PostgreSQL transactions to ensure only one article can be featured at a time.

#### **Rich Text Publishing**

Integrated TipTap to provide a customizable article editing experience with support for:
- headings
- lists
- blockquotes
- formatted content

## ⚡ **Installation**

**Clone the repository:**

```bash
    git clone https://github.com/EricG442/ajr6k
```

### 🔐 **Environment Variables**

**Create a `.env` file:**

```
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

**Make sure your Supabase project has:**
- Authentication enabled
- Posts table configured
- Storage bucket created
- RLS policies applied

**Install dependencies:**

```bash
    npm install
```

**Start the Development Server:**

```bash
    npm run dev
```

    
## 🚧 **Roadmap**

### **v0.3.0** ✅
- [x] ~~Tiptap editor integration~~
- [x] ~~Custom toolbar~~
- [x] ~~localStorage persistance~~
- [x] ~~Editor statistics~~

### **v0.4.0** ✅
- [x] ~~Supabase Auth~~
- [x] ~~Article CRUD operations~~
- [x] ~~Article Image Upload~~
- [x] ~~Public Article Page~~
 
### **v0.5.0** ✅
- [x] ~~User Profiles~~
- [x] ~~Dashboard~~
- [x] ~~Publishing Workflow~~
- [x] ~~League filtering~~
- [x] ~~Home Page~~

### **v1.0.0**
- [x] ~~Full CMS workflow~~
- [x] ~~Protected routes~~
- [x] ~~Production ready article management~~
- [x] ~~Featured article system~~
- [x] ~~Responsive public platform~~
- [ ] Production Deployment 

### **Future Improvements**
- [ ] Search features
- [ ] Author profile images and bio
- [ ] Author pages
- [ ] Production Deployment
- [ ] Analytics
- [ ] Content scheduling
- [ ] Newsletter integration
- [ ] Editorial workflow
- [ ] Social media publishing tools

## 🚀 Project Status

Astro6k is currently in active development.

The current version provides a complete publishing workflow. Future development will focus on audience growth, analytics, and editorial tools.

## 📸 Screenshots