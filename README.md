
# 🚀 Astro6k
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-Build-purple?logo=vite) 
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-06B6D4?logo=tailwindcss) 
![shadcn/ui](https://img.shields.io/badge/shadcn/ui-components-black)
![Licencse](https://img.shields.io/badge/license-MIT-blue)

A sports journalism platform currently being developed as a custom CMS experience

The project is starting as a static React application with a custom Tiptap article editor.
The current goal is to build the writing experience first, then expand into a full CMS with authentication, database storage, and publishing workflows.


## Demo

Link to demo


## Overview

This project is being build in stages:
- **v0.x** &mdash; Static frontend and editor
- **v1.0** &mdash; Full CMS with backend services and production deployment

The current version focuses on creating a rich article writing experience before introducting backend complexity.
### ✨ Features

#### **v0.3.1**
- Custom Tiptap rich text editor
- Editor toolbar with:
    - Headings
    - Bold
    - Italic
    - Underline
    - Strikethrough
    - Text alignment
- LocalStorage article persistence
- Article clearing/reset functionality
- Word and Character count tracking
- Responsive UI


### 🛠️ Tech Stack

**Client:** React, Vite, Tailwind CSS, Tiptap

**Future Server:** Node, Express, Supabase



## ⚡ Installation

Clone the repository:

```bash
    git clone https://github.com/EricG442/ajr6k
```

Install dependencies:

```bash
    npm install
```

Start the Development Server:

```bash
    npm run dev
```

    
## 🚧 Roadmap

### **v0.3.0** ✅
- [x] ~~Tiptap editor integration~~
- [x] ~~Custom toolbar~~
- [x] ~~localStorage persistance~~
- [x] ~~Editor statistics~~

### **v0.4.0**
- [x] ~~Supabase Auth~~

### **v1.0.0**
- [ ] Supabase database integration
- [ ] User authentication
- [ ] Article CRUD operations
- [ ] Image uploads
- [ ] Dashboard Page
- [ ] Production Deployment