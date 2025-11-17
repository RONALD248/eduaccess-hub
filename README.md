# 🎓 EduAccess Hub - SDG 4 Quality Education Platform

![EduAccess Hub](https://img.shields.io/badge/EduAccess-Hub-8B0000)
![SDG 4](https://img.shields.io/badge/UN-SDG%204-228B22)
![Accessibility](https://img.shields.io/badge/Accessibility-WCAG%202.1%20AA-success)
![PWA](https://img.shields.io/badge/PWA-Ready-blueviolet)

## 🌟 Overview

**EduAccess Hub** is a comprehensive web application that transforms educational content into multiple accessible formats, supporting **UN Sustainable Development Goal 4 - Quality Education**. The platform breaks down barriers to education by providing AI-powered accessibility tools for diverse learners worldwide.

> 🎯 **Mission**: Making quality education accessible to every learner, regardless of abilities, language, or learning preferences.

## 🚀 Live Demo

🔗 **Live Application**: (https://ronald-omollo-edu-hub.vercel.app/)


## ✨ Features

### 🎤 Voice & Speech
- **Real-time Voice Recording** with live transcription
- **Text-to-Speech** with multiple voice options and speed control
- **Speech Recognition** for educational content

### 🌐 Language & Translation
- **15+ Language Translation** with educational context preservation
- **Multi-language Support** for global accessibility
- **Educational Terminology** mapping

### 📝 Content Transformation
- **Text Simplification** at three levels (Light, Medium, Heavy)
- **Readability Analysis** with detailed statistics
- **Educational Context** preservation

### 📄 Document Processing
- **PDF Text Extraction** using PDF.js
- **Image OCR** with Tesseract.js for textbook pages and whiteboards
- **Multiple Format Support** (PDF, DOC, TXT, Images)

 ### AI Assistant.  
 -Have an AI Chatbot that that helps learners in the areas of their difficulties in their learning environments.

### 🎨 Accessibility Features
- **Multiple Themes**: Light, Dark, and High Contrast modes
- **WCAG 2.1 AA Compliant**
- **Keyboard Navigation** support
- **Screen Reader** compatible

### 📱 Progressive Web App
- **Offline Functionality**
- **Installable** on all devices
- **Fast Loading** with service worker caching

## 🛠️ Technology Stack

### Frontend
- **HTML5** with semantic markup
- **CSS3** with CSS Grid, Flexbox, and CSS Variables
- **Vanilla JavaScript** (ES6+ modules)

### Libraries & APIs
- **Web Speech API** - Voice recognition and synthesis
- **PDF.js** - Document processing
- **Tesseract.js** - Optical Character Recognition
- **Font Awesome** - Icons
- **Google Fonts** - Typography (Inter)

### PWA Features
- **Service Worker** for offline caching
- **Web App Manifest** for native app experience
- **Background Sync** capabilities

## 🎯 Supported Browsers

| Browser | Voice Features | File Processing | PWA |
|---------|----------------|-----------------|-----|
| Chrome  | ✅ Full support | ✅ Excellent | ✅ |
| Edge    | ✅ Good support | ✅ Good | ✅ |
| Firefox | ⚠️ Limited | ✅ Good | ✅ |
| Safari  | ⚠️ Limited | ✅ Basic | ✅ |

## 📦 Installation & Setup

### Prerequisites
- Modern web browser (Chrome recommended for full features)
- Local server for development (VS Code Live Server, Python HTTP server, etc.)

### Quick Start
1. **Clone the repository**
   ```bash
   git clone https://github.com/RONALD248/eduaccess-hub.git
   cd eduaccess-hub
   ```

2. **Serve the application**
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Using Node.js http-server
   npx http-server
   
   # Using VS Code Live Server extension
   ```

3. **Open in browser**
   ```
   http://localhost:8000
   ```

### Production Deployment
The application is ready for deployment on any static hosting service:
- **Netlify**, **Vercel**, **GitHub Pages**
- **Apache/Nginx** web servers
- **AWS S3** + CloudFront

## 🏗️ Project Structure

```
eduaccess-hub/
├── index.html                 # Main application entry point
├── manifest.json             # PWA manifest
├── sw.js                     # Service Worker
├── css/
│   ├── style.css             # Main stylesheet with maroon theme
│   └── themes.css            # Dark/High Contrast theme definitions
└── js/
    ├── app.js                # Main application controller
    ├── speech.js             # Text-to-speech module
    ├── translation.js        # Multi-language translation
    ├── simplification.js     # Text simplification engine
    ├── file-processing.js    # Document and PDF processing
    ├── voice-recognition.js  # Speech-to-text recording
    └── image-analysis.js     # OCR and image processing
```

## 🎨 Design System

### Color Palette
- **Primary Maroon**: `#8B0000`, `#660000`, `#A52A2A`
- **Accent Gold**: `#D4AF37`, `#E6C35C`
- **Educational Teal**: `#228B22`, `#32A532`
- **Neutral Cream**: `#FFF8F0`, `#FDF6F0`

### Typography
- **Primary Font**: Inter (Google Fonts)
- **Font Weights**: 300, 400, 500, 600, 700, 800
- **Responsive Scaling**: 8-point type scale

### Components
- **Tool Cards** with icon headers and descriptive content
- **Beautiful Buttons** with hover and active states
- **Progress Indicators** with smooth animations
- **Notifications** with type-based styling

## 🔧 Usage Guide

### For Students
1. **Upload educational materials** or type/paste content
2. **Choose accessibility tools** based on your needs:
   - Use **Text-to-Speech** for auditory learning
   - **Translate** content to your preferred language
   - **Simplify** complex academic text
   - **Record voice notes** for assignments

### For Educators
1. **Create accessible lesson materials**
2. **Process documents and images** for classroom use
3. **Generate multiple formats** for diverse learners
4. **Analyze readability** of educational content

### For Institutions
1. **Support inclusive education** initiatives
2. **Provide accessibility tools** for all students
3. **Implement UDL (Universal Design for Learning)** principles

## 🌍 SDG 4 Impact

EduAccess Hub directly supports **UN Sustainable Development Goal 4** by:

### Target 4.5
- **Eliminating disparities** in education access
- **Equal access** for persons with disabilities
- **Gender equality** in educational materials

### Target 4.a
- **Building accessible education facilities** digitally
- **Disability-sensitive learning environments**
- **Inclusive educational resources**

### Target 4.7
- **Education for sustainable development**
- **Global citizenship education**
- **Cultural diversity promotion**

## 🚀 Feature Details

### Text-to-Speech
- Multiple voice options from browser's speech synthesis
- Speed control from 0.5x to 2.0x
- Play, pause, stop, and resume controls
- Visual feedback during playback

### Translation System
- 15+ languages with native language names
- Educational terminology preservation
- Multiple translation methods with fallbacks
- Cultural context awareness

### Voice Recording
- Real-time speech recognition
- Educational content formatting
- Live statistics and visual feedback
- Auto-save functionality

### Document Processing
- PDF text extraction with multi-page support
- Image OCR for educational materials
- File validation and size limits
- Progress tracking

### Readability Analysis
- Give us the time need to read the specific amount of text.
- Analyses some texts and gives the properties of it including:
    - Number of words.
    - Number of paragraph.
    - The number of sentences.

## 🔒 Privacy & Security

- **No data sent to external servers** (all processing happens locally)
- **Browser-based processing** ensures privacy
- **No user tracking** or analytics
- **Local storage** only for user preferences

## 🤝 Contributing

We welcome contributions to make education more accessible!

### How to Contribute
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow WCAG 2.1 AA accessibility standards
- Maintain the maroon and gold color scheme
- Ensure cross-browser compatibility
- Write clean, documented code

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **UN Sustainable Development Goals** for inspiration
- **Web Speech API** team for voice capabilities
- **PDF.js** and **Tesseract.js** communities
- **Educational institutions** worldwide working towards accessibility

## 📞 Support & Contact

- **Developer**: Ronald Omollo
- **Email**: collincesronald@gmail.com
- **Issue Tracker**: [GitHub Issues](https://github.com/RONALD248/eduaccess-hub/issues)
- **Tel Number**: 0715920019

## 🌟 Star History

[![Star History Chart](https://api.star-history.com/svg?repos=yourusername/eduaccess-hub&type=Date)](https://star-history.com/#yourusername/eduaccess-hub&Date)

---

<div align="center">

**Made with ❤️ for Quality Education Worldwide**

*Supporting UN Sustainable Development Goal 4*

![SDG 4](https://www.un.org/sustainabledevelopment/wp-content/uploads/2018/05/E_SDG-goals_icons-individual-rgb-04.png)

</div>
