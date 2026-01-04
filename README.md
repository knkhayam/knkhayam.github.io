# Khuram Nawaz Khayam - Portfolio

A business-focused portfolio website showcasing expertise in AI automation, scalable web platforms, and industrial automation systems. Built to demonstrate business impact and outcomes, not just technical skills.

## 🎯 Purpose

This portfolio positions me as a problem solver who delivers measurable business results through:
- **AI & Automation for Operational Efficiency** - Automating manual processes and reducing costs
- **Scalable Web Platforms & MVPs** - Building production-ready software in 4-6 weeks
- **Autonomous & Industrial Automation Systems** - Creating reliable systems for real-world environments

## 🚀 Key Features

- **Business Impact Focus**: Every project follows Problem → Solution → Impact structure
- **Clear Value Proposition**: "I help startups and businesses build production-ready software, automation, and AI systems"
- **Engagement Models**: Transparent pricing and project structure
- **Process Transparency**: "How I Work" section builds trust
- **Help Assistant**: AI-powered chat assistant for visitors to discuss projects and capabilities
- **Mobile Responsive**: Optimized for all devices
- **Fast Loading**: Static site with optimized assets

## 📋 Sections

1. **Hero Section**: Clear value proposition with call-to-action
2. **AI & Automation**: Computer vision, ML systems, and process automation projects
3. **Web Platforms**: Full-stack development, MVPs, and scalable systems
4. **Industrial Automation**: Robotics, autonomous systems, and vision integration
5. **How I Work**: 4-step process (Understand → Build → Iterate → Deliver)
6. **Engagement Models**: Clear project structures and expectations
7. **Tools I Use**: Outcome-focused technology stack
8. **Contact**: Get in touch with consultation offer

## 🛠️ Technologies

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with gradients, animations, and responsive design
- **Vanilla JavaScript** - Smooth scrolling, animations, and interactivity
- **Google Fonts** - Inter font family
- **Node.js/Express** - Backend API for chat assistant
- **OpenAI API** - GPT-3.5-turbo for intelligent responses

## 💬 Help Assistant Setup

The portfolio includes an AI-powered help assistant. To set it up:

1. **Backend Setup:**
   ```bash
   cd backend
   npm install
   cp env.template .env
   # Add your OpenAI API key to .env
   npm start
   ```

2. **Configure API URL:**
   - Update `API_URL` in `script.js` to match your backend server URL
   - For production, deploy backend separately and update the URL

3. **Backend Features:**
   - Single `/api/chat` endpoint
   - Rate limiting (20 requests per 15 minutes)
   - Context-aware responses based on portfolio
   - Conversation history per session
   - Uses cheapest OpenAI model (gpt-3.5-turbo)

See `backend/README.md` for detailed backend documentation.

## 📦 Deployment

This portfolio is designed for GitHub Pages:

1. Push the code to your GitHub repository
2. Enable GitHub Pages in repository settings
3. Select the main branch as source
4. Your portfolio will be live at `https://knkhayam.github.io`

**Note:** The chat assistant requires a separate backend deployment. The frontend will work without it, but the chat feature won't function.

## 🎨 Design Philosophy

The portfolio follows a **business-first approach**:
- Lead with business outcomes, not technical skills
- Quantify impact (time saved, cost reduction, efficiency gains)
- Clear value proposition for target clients (startups, SMEs)
- Professional, modern design that builds trust
- Mobile-first responsive design

## 📝 Customization

All content is in `index.html`. Key areas to customize:
- Hero section: Value proposition and target audience
- Projects: Problem → Solution → Impact structure
- Engagement models: Pricing and project structures
- Contact information: Email, location, social links

## 🔄 Version Control

CSS and JavaScript files use version query parameters (`?v=1`) for cache busting. Increment the version number when updating production files.

## 📄 License

See LICENSE file for details.

---

**Built with precision and passion** - Focused on delivering business impact, not just code.
