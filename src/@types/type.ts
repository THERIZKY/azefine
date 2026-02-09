export interface Service {
    id: string;
    title: string;
    category: string;
    description: string;
    fullDescription?: string;
    scope?: string[];
    deliverables?: string[];
    priceStart?: string;
    icon: string;
    image?: string;
}

export interface ProductSpec {
    label: string;
    value: string;
}

export interface Product {
    id: string;
    name: string;
    slug: string;
    sku: string;
    category: string;
    description: string;
    regularPrice: number;
    promoPrice?: number;
    stock: number;
    images: string[];
    specifications: ProductSpec[];
    status: "published" | "draft" | "hidden";
    // Added seo property to fix Admin.tsx errors
    seo?: { title: string; description: string };
}

export interface BlogPost {
    id: string;
    title: string;
    excerpt: string;
    content: string;
    date: string;
    author: string;
    category: string;
    tags: string[];
    imageUrl?: string;
}

export interface ContactInfo {
    email: string;
    phone: string;
    address: string;
    hours: string;
}

export interface HomepageSectionVisibility {
    hero: boolean;
    problemSolution: boolean;
    capabilities: boolean;
    process: boolean;
    services: boolean;
    products: boolean;
    whyUs: boolean;
    dis: boolean;
    blog: boolean;
    cta: boolean;
}

export interface SectionStyle {
    variant: "default" | "alternate" | "dark" | "brand";
    align: "left" | "center" | "right";
    padding: "normal" | "compact" | "loose";
}

export interface SiteContent {
    heroTitle: string;
    heroSubtitle: string;
    problemsList: string[];
    solutionsList: string[];
    capabilitiesList: { title: string; content: string }[];
    processSteps: string;
    whyUsPoints: {
        value: string;
        trigger: string;
        content: { header: string; list: string[]; footer: string };
    }[];
    finalCtaTitle: string;
    finalCtaSubtitle: string;
    aboutText: string;
    vision: string;
    mission: string;
    coreValuesList: string;
    positioningStatement: string;
    contactInfo: ContactInfo;
    sectionVisibility: HomepageSectionVisibility;
    sectionOrder: (keyof HomepageSectionVisibility)[];
    sectionStyles: Record<string, SectionStyle>;
}

export interface User {
    id: string;
    name: string;
    email: string;
    role: "user" | "admin";
    // Added phone property to fix Services.tsx and ProductDetail.tsx errors
    phone?: string;
}

// Added missing interfaces for DataContext and Admin Panel
export interface SmtpConfig {
    host: string;
    port: string;
    user: string;
    pass: string;
    fromEmail: string;
    isEnabled: boolean;
    secure?: boolean;
    from?: string;
}

export interface Order {
    id: string;
    date: string;
    item: string;
    type: "product" | "service";
    status: "pending" | "processing" | "completed" | "cancelled" | "paid";
    amount: number;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    notes?: string;
    paymentProof?: string;
}

export type UserOrder = Order;

export interface PaymentGatewayConfig {
    provider: string;
    isSandbox: boolean;
    apiKey?: string;
    clientKey?: string;
    serverKey?: string;
    merchantId?: string;
}

export interface ContactMessage {
    id: string;
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
    created_at: string;
    status: "new" | "read";
}

export interface Notification {
    id: string;
    message: string;
    type: "success" | "error" | "info";
}
