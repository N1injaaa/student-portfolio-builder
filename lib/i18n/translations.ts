export type Lang = "en" | "ru";

/**
 * Flat key → string dictionary per language. Keys are namespaced by
 * screen (nav.*, dashboard.*, editor.*, resume.*, portfolio.*, auth.*)
 * so it's obvious where each string is used. Add new keys here first,
 * then reference them with t('namespace.key') in components.
 */
export const translations: Record<Lang, Record<string, string>> = {
  en: {
    // Nav
    "nav.dashboard": "Dashboard",
    "nav.editor": "Editor",
    "nav.resume": "Resume",
    "nav.portfolio": "Portfolio",
    "nav.admin": "Admin",
    "nav.signOut": "Sign out",

    // Dashboard
    "dashboard.title": "Dashboard",
    "dashboard.subtitle": "Your profile, resume, and portfolio at a glance.",
    "dashboard.upgrade.title": "Unlock the tools that actually get you interviews",
    "dashboard.upgrade.subtitle":
      "Pro unlocks every resume template, unlimited PDF exports, the full ATS breakdown, saved resume versions, portfolio view analytics, and every theme.",
    "dashboard.upgrade.button": "Upgrade to Pro",
    "dashboard.completion": "Profile completion",
    "dashboard.editProfile": "Edit profile",
    "dashboard.viewResume": "View resume",
    "dashboard.viewPortfolio": "View portfolio",
    "dashboard.portfolioSettings": "Portfolio settings",
    "dashboard.tryDemo": "Load demo data",
    "dashboard.welcomeBack": "Welcome back, {name}",
    "dashboard.welcome": "Welcome",
    "dashboard.tagline": "Here's where your resume and portfolio stand.",
    "dashboard.loadDemo": "Load demo profile",
    "dashboard.stat.projects": "Projects",
    "dashboard.stat.achievements": "Achievements",
    "dashboard.stat.certificates": "Certificates",
    "dashboard.stat.skills": "Skills",
    "dashboard.profileComplete": "Your profile is complete — nice work.",
    "dashboard.completeProfile": "Complete my profile",
    "dashboard.resumeStatus": "Resume status",
    "dashboard.template": "Template",
    "dashboard.portfolioStatus": "Portfolio status",
    "dashboard.open": "Open →",
    "dashboard.liveAt": "Live at",
    "dashboard.draft": "Draft — not published",
    "dashboard.usernameNotSet": "Username not set",
    "dashboard.educationEntries": "Education entries",
    "dashboard.onRecord": "on record",
    "dashboard.empty.title": "Nothing here yet",
    "dashboard.empty.description":
      "Fill out your profile to start building your resume and portfolio.",
    "dashboard.emptyTitle": "Your profile is empty",
    "dashboard.emptyDescription":
      "Add your first education entry or project to start building your resume and portfolio.",

    // Editor
    "editor.title": "Profile editor",
    "editor.subtitle": "Build the record your resume and portfolio pull from.",
    "editor.showPreview": "Show preview",
    "editor.hidePreview": "Hide preview",
    "editor.livePreview": "Live preview",
    "editor.livePreviewHint": "Live preview — updates as you type",
    "editor.previewPortfolio": "Portfolio",
    "editor.previewResume": "Resume",
    "editor.section.overview": "Overview",
    "editor.section.education": "Education",
    "editor.section.projects": "Projects",
    "editor.section.achievements": "Achievements",
    "editor.section.skills": "Skills",
    "editor.section.languages": "Languages",
    "editor.section.certificates": "Certificates",
    "editor.section.activities": "Activities",

    // Resume builder
    "resume.title": "Resume builder",
    "resume.subtitle": "Choose a template, tune the details, and export a print-ready PDF.",
    "resume.export": "Export PDF",
    "resume.exporting": "Preparing PDF…",
    "resume.upgradeToExport": "Upgrade to export",
    "resume.exportsLeft": "free exports left",
    "resume.limitReached": "Free export limit reached",

    // Portfolio settings
    "portfolio.title": "Portfolio builder",
    "portfolio.subtitle": "Configure your public site and preview it before publishing.",
    "portfolio.username": "Portfolio username",
    "portfolio.published": "Published",
  "portfolio.viewLive": "View live",
  "portfolio.theme": "Theme",

    // Auth
  "auth.signInWithGoogle": "Sign in with Google",
  "auth.continueWithGoogle": "Continue with Google",
  "auth.signInTitle": "Sign in to continue",
  "auth.signInDescription":
    "Your resume and portfolio data is saved to your account, so you can pick up where you left off from any device.",
  "auth.loadErrorTitle": "Couldn't load your profile",
  "auth.tryAgain": "Try again",
    "auth.signInHint": "Sign in with Google to get started — takes a few seconds.",

    // Common
    "common.save": "Save",
    "common.cancel": "Cancel",
    "common.delete": "Delete",
    "common.add": "Add",
    "common.loading": "Loading…",

    // Shared form fields
    "field.fullName": "Full name",
    "field.headline": "Headline",
    "field.photo": "Profile photo",
    "field.photoOr": "Or paste an image link instead:",
    "field.uploadPhoto": "Upload photo",
    "field.uploading": "Uploading…",
    "field.bio": "Short bio",
    "field.location": "Location",
    "field.email": "Email",
    "field.phone": "Phone",
    "field.website": "Website",
    "field.linkedin": "LinkedIn",
    "field.github": "GitHub",
    "field.school": "School / University",
    "field.degree": "Degree / Grade",
    "field.startDate": "Start date",
    "field.endDate": "End date",
    "field.gpa": "GPA",
    "field.description": "Description",
    "field.projectName": "Project name",
    "field.technologies": "Technologies",
    "field.githubUrl": "GitHub URL",
    "field.liveUrl": "Live URL",
    "field.imageUrl": "Project image URL",
    "field.title": "Title",
    "field.organization": "Organization",
    "field.date": "Date",
    "field.skillName": "Skill name",
    "field.category": "Category",
    "field.level": "Level",
    "field.language": "Language",
    "field.certificateName": "Certificate name",
    "field.credentialUrl": "Credential URL",
    "field.position": "Position",

    // Overview form
    "form.overview.title": "Overview",
    "form.overview.subtitle": "This information appears at the top of your resume and portfolio.",
    "form.overview.saved": "Saved",

    // Education
    "form.education.itemLabel": "Education",
    "form.education.emptyTitle": "No education yet",
    "form.education.emptyDescription": "Add your school or university to start your timeline.",
    // Projects
    "form.projects.itemLabel": "Project",
    "form.projects.emptyTitle": "No projects yet",
    "form.projects.emptyDescription":
      "Showcase what you've built — even a small side project counts.",
    // Achievements
    "form.achievements.itemLabel": "Achievement",
    "form.achievements.emptyTitle": "No achievements yet",
    "form.achievements.emptyDescription": "Add awards, competitions, or recognitions.",
    // Skills
    "form.skills.itemLabel": "Skill",
    "form.skills.emptyTitle": "No skills yet",
    "form.skills.emptyDescription": "List the languages, tools, and frameworks you know.",
    // Languages
    "form.languages.itemLabel": "Language",
    "form.languages.emptyTitle": "No languages yet",
    "form.languages.emptyDescription": "Add the languages you speak and your fluency level.",
    // Certificates
    "form.certificates.itemLabel": "Certificate",
    "form.certificates.emptyTitle": "No certificates yet",
    "form.certificates.emptyDescription": "Add certifications, online courses, or credentials.",
    // Activities
    "form.activities.itemLabel": "Activity",
    "form.activities.emptyTitle": "No activities yet",
    "form.activities.emptyDescription": "Add clubs, volunteering, or extracurricular leadership.",

    // Entry list editor chrome
    "entryEditor.editing": "Editing",
    "entryEditor.new": "New",
    "entryEditor.updatingPreview": "Updating preview…",
    "entryEditor.liveHint": "Changes show in the preview as you type.",
    "entryEditor.saveChanges": "Save changes",
    "entryEditor.addPrefix": "Add",
    "entryEditor.addFirstPrefix": "+ Add your first",
    "entryEditor.deleteConfirmTitle": "Delete this",
    "entryEditor.deleteConfirmSuffix": "?",
    "entryEditor.deleteConfirmDescription": "This can't be undone.",
    "entryEditor.added": "added",
    "entryEditor.updated": "updated",
    "entryEditor.removed": "removed",

    // Landing page
    "landing.nav.features": "Features",
    "landing.nav.templates": "Templates",
    "landing.nav.howItWorks": "How it works",
    "landing.nav.faq": "FAQ",
    "landing.nav.signIn": "Sign in",
    "landing.nav.createPortfolio": "Create my portfolio",
    "landing.hero.badge": "Built for university and internship applications",
    "landing.hero.title": "Build a portfolio that gets you noticed.",
    "landing.hero.subtitle":
      "Create your student resume and portfolio in minutes — one profile, four resume templates, and a public site admissions officers and recruiters can actually visit.",
    "landing.hero.viewTemplates": "View templates",
    "landing.hero.signInHint": "Sign in with Google to get started — takes a few seconds.",
    "landing.trustedBy":
      "Trusted by students applying to UT Austin · UC Berkeley · Waterloo · NUS · Imperial College",
    "landing.why.title": "Why",
    "landing.why.point0.title": "Built for students",
    "landing.why.point0.body":
      "Every field maps to what admissions and recruiters actually ask for — GPA, activities, and credentials included.",
    "landing.why.point1.title": "One profile, two outputs",
    "landing.why.point1.body":
      "Fill in your information once. Generate a downloadable resume and a public portfolio from the same data.",
    "landing.why.point2.title": "Private until you publish",
    "landing.why.point2.body":
      "Everything saves automatically as you type, visible only to you — until you choose to publish your portfolio.",
    "landing.features.title": "Everything you need to apply",
    "landing.features.0.title": "Guided profile editor",
    "landing.features.0.body":
      "Structured sections for education, projects, achievements, skills, languages, certificates, and activities.",
    "landing.features.1.title": "Four resume templates",
    "landing.features.1.body":
      "Minimal, Modern, Academic, and Professional — with live, no-reload preview as you edit.",
    "landing.features.2.title": "Public portfolio site",
    "landing.features.2.body":
      "A shareable page at /portfolio/yourname, with themes, layouts, and section visibility you control.",
    "landing.features.3.title": "Reorder anything",
    "landing.features.3.body":
      "Add, edit, delete, and reorder every entry — projects, skills, and education included.",
    "landing.templates.title": "Resume templates",
    "landing.templates.previewAll": "Preview all templates →",
    "landing.templates.note0": "Quiet type, generous margins",
    "landing.templates.note1": "Bold header, accent rule",
    "landing.templates.note2": "Serif, transcript-style",
    "landing.templates.note3": "Two-column, dense",
    "landing.example.title": "Portfolio example",
    "landing.example.description":
      "A finished public portfolio, built from the same profile data as the resume — this is what yours could look like once published.",
    "landing.example.role": "Computer Science Student · Sample profile",
    "landing.example.quote":
      "\u201cBuilding technology that solves real problems.\u201d — three projects, five achievements, and a full education timeline.",
    "landing.example.tryButton": "Try it with this sample data",
    "landing.how.title": "How it works",
    "landing.how.0.title": "Fill in your record",
    "landing.how.0.body":
      "Add your education, projects, achievements, and skills once — in one structured profile.",
    "landing.how.1.title": "Pick a resume template",
    "landing.how.1.body": "Choose Minimal, Modern, Academic, or Professional. Preview updates as you type.",
    "landing.how.2.title": "Publish your portfolio",
    "landing.how.2.body": "Turn the same profile into a public site at your own /portfolio/username address.",
    "landing.how.3.title": "Export and apply",
    "landing.how.3.body":
      "Download a print-ready PDF resume and share your portfolio link with admissions or recruiters.",
    "landing.faq.title": "Frequently asked questions",
    "landing.faq.0.q": "Do I need to create an account?",
    "landing.faq.0.a":
      "Yes — sign in with your Google account. It takes a few seconds, and it's what lets your portfolio have a public link that anyone can visit.",
    "landing.faq.1.q": "Is my data private?",
    "landing.faq.1.a":
      "Only you can see and edit your profile. Your portfolio becomes visible to others only once you publish it from Portfolio Settings.",
    "landing.faq.2.q": "Can I use this for job applications, not just university?",
    "landing.faq.2.a":
      "Yes. The Professional and Modern templates are built for recruiters, while Academic suits admissions committees.",
    "landing.faq.3.q": "Will the PDF look the same as the preview?",
    "landing.faq.3.a":
      "Yes — the export renders the exact template, spacing, and accent color you see in the live preview.",
    "landing.faq.4.q": "Can I have a different portfolio theme than my resume?",
    "landing.faq.4.a": "Yes. Resume templates and portfolio themes are configured separately, so you can mix and match.",
    "landing.finalCta.title": "Your application deserves more than a template résumé.",
    "landing.finalCta.subtitle": "Start with your record. Finish with a resume and portfolio worth sending.",
    "landing.footer.tagline": "Built for students applying to what's next.",
    "landing.footer.createdBy": "Created by",
    "hero.card.readyToSubmit": "Ready to submit",
    "hero.card.applicantRecord": "Applicant record",
    "hero.card.role": "Computer Science Student",
    "hero.card.profileCompletion": "Profile completion",
    "hero.card.projectsListed": "Projects listed",
    "hero.card.achievements": "Achievements",
    "hero.card.resumeStatus": "Resume status",
    "hero.card.exported": "Exported",
    "hero.card.portfolio": "Portfolio",
    "hero.card.live": "Live",
  },
  ru: {
    // Nav
    "nav.dashboard": "Дашборд",
    "nav.editor": "Редактор",
    "nav.resume": "Резюме",
    "nav.portfolio": "Портфолио",
    "nav.admin": "Админ",
    "nav.signOut": "Выйти",

    // Dashboard
    "dashboard.title": "Дашборд",
    "dashboard.subtitle": "Твой профиль, резюме и портфолио в одном месте.",
    "dashboard.upgrade.title": "Открой инструменты, которые реально помогают пройти собеседование",
    "dashboard.upgrade.subtitle":
      "Pro открывает все шаблоны резюме, безлимитный экспорт в PDF, полную ATS-проверку, сохранённые версии резюме, аналитику просмотров портфолио и все темы.",
    "dashboard.upgrade.button": "Перейти на Pro",
    "dashboard.completion": "Заполненность профиля",
    "dashboard.editProfile": "Редактировать профиль",
    "dashboard.viewResume": "Смотреть резюме",
    "dashboard.viewPortfolio": "Смотреть портфолио",
    "dashboard.portfolioSettings": "Настройки портфолио",
    "dashboard.tryDemo": "Загрузить демо-данные",
    "dashboard.welcomeBack": "С возвращением, {name}",
    "dashboard.welcome": "Добро пожаловать",
    "dashboard.tagline": "Вот как обстоят дела с твоим резюме и портфолио.",
    "dashboard.loadDemo": "Загрузить демо-профиль",
    "dashboard.stat.projects": "Проекты",
    "dashboard.stat.achievements": "Достижения",
    "dashboard.stat.certificates": "Сертификаты",
    "dashboard.stat.skills": "Навыки",
    "dashboard.profileComplete": "Профиль полностью заполнен — отлично.",
    "dashboard.completeProfile": "Заполнить профиль",
    "dashboard.resumeStatus": "Статус резюме",
    "dashboard.template": "Шаблон",
    "dashboard.portfolioStatus": "Статус портфолио",
    "dashboard.open": "Открыть →",
    "dashboard.liveAt": "Опубликовано на",
    "dashboard.draft": "Черновик — не опубликовано",
    "dashboard.usernameNotSet": "Имя пользователя не задано",
    "dashboard.educationEntries": "Записи об образовании",
    "dashboard.onRecord": "записей",
    "dashboard.empty.title": "Здесь пока пусто",
    "dashboard.empty.description":
      "Заполни профиль, чтобы начать собирать резюме и портфолио.",
    "dashboard.emptyTitle": "Твой профиль пуст",
    "dashboard.emptyDescription":
      "Добавь первую запись об образовании или проект, чтобы начать собирать резюме и портфолио.",

    // Editor
    "editor.title": "Редактор профиля",
    "editor.subtitle": "Данные отсюда используются в резюме и портфолио.",
    "editor.showPreview": "Показать превью",
    "editor.hidePreview": "Скрыть превью",
    "editor.livePreview": "Превью",
    "editor.livePreviewHint": "Превью обновляется по мере ввода",
    "editor.previewPortfolio": "Портфолио",
    "editor.previewResume": "Резюме",
    "editor.section.overview": "Основное",
    "editor.section.education": "Образование",
    "editor.section.projects": "Проекты",
    "editor.section.achievements": "Достижения",
    "editor.section.skills": "Навыки",
    "editor.section.languages": "Языки",
    "editor.section.certificates": "Сертификаты",
    "editor.section.activities": "Активности",

    // Resume builder
    "resume.title": "Конструктор резюме",
    "resume.subtitle": "Выбери шаблон, настрой детали и экспортируй готовый PDF.",
    "resume.export": "Экспорт в PDF",
    "resume.exporting": "Готовим PDF…",
    "resume.upgradeToExport": "Перейти на Pro для экспорта",
    "resume.exportsLeft": "бесплатных экспортов осталось",
    "resume.limitReached": "Лимит бесплатных экспортов исчерпан",

    // Portfolio settings
    "portfolio.title": "Конструктор портфолио",
    "portfolio.subtitle": "Настрой публичную страницу и посмотри превью перед публикацией.",
    "portfolio.username": "Имя пользователя портфолио",
    "portfolio.published": "Опубликовано",
    "portfolio.theme": "Тема",
    "portfolio.viewLive": "Открыть сайт",

    // Auth
    "auth.signInWithGoogle": "Войти через Google",
    "auth.continueWithGoogle": "Продолжить с Google",
    "auth.signInTitle": "Войдите, чтобы продолжить",
    "auth.signInDescription":
      "Данные резюме и портфолио сохраняются в твоём аккаунте — можно продолжить с любого устройства.",
    "auth.loadErrorTitle": "Не удалось загрузить профиль",
    "auth.tryAgain": "Попробовать снова",
    "auth.signInHint": "Войди через Google, чтобы начать — это займёт пару секунд.",

    // Common
    "common.save": "Сохранить",
    "common.cancel": "Отмена",
    "common.delete": "Удалить",
    "common.add": "Добавить",
    "common.loading": "Загрузка…",

    // Shared form fields
    "field.fullName": "Полное имя",
    "field.headline": "Заголовок",
    "field.photo": "Фото профиля",
    "field.photoOr": "Или вставь ссылку на изображение:",
    "field.uploadPhoto": "Загрузить фото",
    "field.uploading": "Загрузка…",
    "field.bio": "Краткое описание",
    "field.location": "Местоположение",
    "field.email": "Email",
    "field.phone": "Телефон",
    "field.website": "Сайт",
    "field.linkedin": "LinkedIn",
    "field.github": "GitHub",
    "field.school": "Школа / Университет",
    "field.degree": "Степень / Курс",
    "field.startDate": "Дата начала",
    "field.endDate": "Дата окончания",
    "field.gpa": "GPA",
    "field.description": "Описание",
    "field.projectName": "Название проекта",
    "field.technologies": "Технологии",
    "field.githubUrl": "Ссылка на GitHub",
    "field.liveUrl": "Ссылка на демо",
    "field.imageUrl": "Ссылка на изображение проекта",
    "field.title": "Название",
    "field.organization": "Организация",
    "field.date": "Дата",
    "field.skillName": "Название навыка",
    "field.category": "Категория",
    "field.level": "Уровень",
    "field.language": "Язык",
    "field.certificateName": "Название сертификата",
    "field.credentialUrl": "Ссылка на сертификат",
    "field.position": "Должность",

    // Overview form
    "form.overview.title": "Основное",
    "form.overview.subtitle": "Эта информация отображается в начале резюме и портфолио.",
    "form.overview.saved": "Сохранено",

    // Education
    "form.education.itemLabel": "Образование",
    "form.education.emptyTitle": "Пока нет данных об образовании",
    "form.education.emptyDescription": "Добавь школу или университет, чтобы начать хронологию.",
    // Projects
    "form.projects.itemLabel": "Проект",
    "form.projects.emptyTitle": "Пока нет проектов",
    "form.projects.emptyDescription":
      "Покажи, что ты создал — даже небольшой пет-проект считается.",
    // Achievements
    "form.achievements.itemLabel": "Достижение",
    "form.achievements.emptyTitle": "Пока нет достижений",
    "form.achievements.emptyDescription": "Добавь награды, соревнования или признания.",
    // Skills
    "form.skills.itemLabel": "Навык",
    "form.skills.emptyTitle": "Пока нет навыков",
    "form.skills.emptyDescription": "Перечисли языки программирования, инструменты и фреймворки.",
    // Languages
    "form.languages.itemLabel": "Язык",
    "form.languages.emptyTitle": "Пока нет языков",
    "form.languages.emptyDescription": "Добавь языки, которыми владеешь, и уровень владения.",
    // Certificates
    "form.certificates.itemLabel": "Сертификат",
    "form.certificates.emptyTitle": "Пока нет сертификатов",
    "form.certificates.emptyDescription": "Добавь сертификаты, онлайн-курсы или другие подтверждения квалификации.",
    // Activities
    "form.activities.itemLabel": "Активность",
    "form.activities.emptyTitle": "Пока нет активностей",
    "form.activities.emptyDescription": "Добавь клубы, волонтёрство или внеучебное лидерство.",

    // Entry list editor chrome
    "entryEditor.editing": "Редактирование",
    "entryEditor.new": "Новое",
    "entryEditor.updatingPreview": "Обновление превью…",
    "entryEditor.liveHint": "Изменения отображаются в превью по мере ввода.",
    "entryEditor.saveChanges": "Сохранить",
    "entryEditor.addPrefix": "Добавить",
    "entryEditor.addFirstPrefix": "+ Добавить первое",
    "entryEditor.deleteConfirmTitle": "Удалить это",
    "entryEditor.deleteConfirmSuffix": "?",
    "entryEditor.deleteConfirmDescription": "Это действие необратимо.",
    "entryEditor.added": "добавлено",
    "entryEditor.updated": "обновлено",
    "entryEditor.removed": "удалено",

    // Landing page
    "landing.nav.features": "Возможности",
    "landing.nav.templates": "Шаблоны",
    "landing.nav.howItWorks": "Как это работает",
    "landing.nav.faq": "Вопросы",
    "landing.nav.signIn": "Войти",
    "landing.nav.createPortfolio": "Создать портфолио",
    "landing.hero.badge": "Создано для поступления в вуз и стажировок",
    "landing.hero.title": "Собери портфолио, которое тебя заметят.",
    "landing.hero.subtitle":
      "Создай студенческое резюме и портфолио за минуты — один профиль, четыре шаблона резюме и публичный сайт, который реально посмотрят приёмные комиссии и рекрутеры.",
    "landing.hero.viewTemplates": "Смотреть шаблоны",
    "landing.hero.signInHint": "Войди через Google, чтобы начать — это займёт пару секунд.",
    "landing.trustedBy":
      "Нам доверяют студенты, поступающие в UT Austin · UC Berkeley · Waterloo · NUS · Imperial College",
    "landing.why.title": "Почему",
    "landing.why.point0.title": "Создано для студентов",
    "landing.why.point0.body":
      "Каждое поле соответствует тому, что реально спрашивают приёмные комиссии и рекрутеры — GPA, активности и сертификаты включены.",
    "landing.why.point1.title": "Один профиль, два результата",
    "landing.why.point1.body":
      "Заполни информацию один раз. Получи скачиваемое резюме и публичное портфолио из одних и тех же данных.",
    "landing.why.point2.title": "Приватно, пока не опубликуешь",
    "landing.why.point2.body":
      "Всё сохраняется автоматически по мере ввода и видно только тебе — пока ты сам не опубликуешь портфолио.",
    "landing.features.title": "Всё, что нужно для подачи заявки",
    "landing.features.0.title": "Пошаговый редактор профиля",
    "landing.features.0.body":
      "Структурированные разделы: образование, проекты, достижения, навыки, языки, сертификаты и активности.",
    "landing.features.1.title": "Четыре шаблона резюме",
    "landing.features.1.body":
      "Minimal, Modern, Academic и Professional — с живым превью без перезагрузки по мере редактирования.",
    "landing.features.2.title": "Публичный сайт-портфолио",
    "landing.features.2.body":
      "Страница вида /portfolio/твоеимя, с темами, layout'ами и контролем видимости разделов.",
    "landing.features.3.title": "Меняй порядок как угодно",
    "landing.features.3.body":
      "Добавляй, редактируй, удаляй и меняй порядок любых записей — проекты, навыки, образование.",
    "landing.templates.title": "Шаблоны резюме",
    "landing.templates.previewAll": "Смотреть все шаблоны →",
    "landing.templates.note0": "Спокойный шрифт, широкие поля",
    "landing.templates.note1": "Жирный заголовок, акцентная линия",
    "landing.templates.note2": "Серифный шрифт, стиль транскрипта",
    "landing.templates.note3": "Две колонки, плотная вёрстка",
    "landing.example.title": "Пример портфолио",
    "landing.example.description":
      "Готовое публичное портфолио, собранное из тех же данных профиля, что и резюме — вот как может выглядеть твоё после публикации.",
    "landing.example.role": "Студент Computer Science · Пример профиля",
    "landing.example.quote":
      "«Создаю технологии, которые решают реальные проблемы» — три проекта, пять достижений и полная временная шкала образования.",
    "landing.example.tryButton": "Попробовать на этих примерных данных",
    "landing.how.title": "Как это работает",
    "landing.how.0.title": "Заполни свои данные",
    "landing.how.0.body":
      "Добавь образование, проекты, достижения и навыки один раз — в одном структурированном профиле.",
    "landing.how.1.title": "Выбери шаблон резюме",
    "landing.how.1.body": "Minimal, Modern, Academic или Professional. Превью обновляется по мере ввода.",
    "landing.how.2.title": "Опубликуй портфолио",
    "landing.how.2.body": "Преврати тот же профиль в публичный сайт по адресу /portfolio/username.",
    "landing.how.3.title": "Экспортируй и подавай заявку",
    "landing.how.3.body":
      "Скачай готовый к печати PDF-резюме и поделись ссылкой на портфолио с приёмной комиссией или рекрутером.",
    "landing.faq.title": "Часто задаваемые вопросы",
    "landing.faq.0.q": "Нужно ли создавать аккаунт?",
    "landing.faq.0.a":
      "Да — войди через аккаунт Google. Это займёт пару секунд, и именно это даёт твоему портфолио публичную ссылку, которую может открыть кто угодно.",
    "landing.faq.1.q": "Мои данные приватны?",
    "landing.faq.1.a":
      "Только ты можешь видеть и редактировать свой профиль. Портфолио становится видимым другим, только когда ты сам публикуешь его в настройках портфолио.",
    "landing.faq.2.q": "Можно использовать это для поиска работы, а не только для вуза?",
    "landing.faq.2.a":
      "Да. Шаблоны Professional и Modern рассчитаны на рекрутеров, а Academic подходит приёмным комиссиям.",
    "landing.faq.3.q": "PDF будет выглядеть так же, как в превью?",
    "landing.faq.3.a":
      "Да — экспорт рендерит именно тот шаблон, отступы и акцентный цвет, что ты видишь в живом превью.",
    "landing.faq.4.q": "Можно сделать тему портфолио отличной от темы резюме?",
    "landing.faq.4.a": "Да. Шаблоны резюме и темы портфолио настраиваются отдельно, можно комбинировать как угодно.",
    "landing.finalCta.title": "Твоя заявка заслуживает большего, чем шаблонное резюме.",
    "landing.finalCta.subtitle": "Начни со своих данных. Закончи резюме и портфолио, которые стоит отправлять.",
    "landing.footer.tagline": "Создано для студентов, которые идут дальше.",
    "landing.footer.createdBy": "Автор",
    "hero.card.readyToSubmit": "Готово к подаче",
    "hero.card.applicantRecord": "Личное дело",
    "hero.card.role": "Студент Computer Science",
    "hero.card.profileCompletion": "Заполненность профиля",
    "hero.card.projectsListed": "Проектов указано",
    "hero.card.achievements": "Достижения",
    "hero.card.resumeStatus": "Статус резюме",
    "hero.card.exported": "Экспортировано",
    "hero.card.portfolio": "Портфолио",
    "hero.card.live": "Опубликовано",
  },
};
