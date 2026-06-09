export const OWNER = {
  name: "Gustavo Santos",
  role: "Desenvolvedor Full Stack",
  specialty: "Inteligência Artificial & Cloud",
  email: "gt.santosx04@gmail.com",
  github: "https://github.com/GtxSantos",
  linkedin: "https://linkedin.com/in/gustavo-santos-076729321",
  photo: "https://i.imgur.com/YTCfLb0.png",
  bio: "Desenvolvedor Full Stack com foco em soluções que integram Inteligência Artificial, arquitetura cloud e automação de infraestrutura. Tenho experiência construindo sistemas escaláveis com Python, React e AWS, e um interesse particular por modelos de Machine Learning aplicados a problemas reais.",
};

export interface Skill {
  label: string;
  level: number; // 1-5
}

export interface SkillGroup {
  title: string;
  skills: Skill[];
}

export const SKILL_GROUPS: SkillGroup[] = [
  {
    title: "Desenvolvimento",
    skills: [
      { label: "Python", level: 5 },
      { label: "TypeScript", level: 4 },
      { label: "React", level: 4 },
      { label: "FastAPI", level: 4 },
      { label: "Node.js", level: 3 },
      { label: "SQL / PostgreSQL", level: 4 },
    ],
  },
  {
    title: "Cloud & DevOps",
    skills: [
      { label: "AWS", level: 5 },
      { label: "Docker", level: 5 },
      { label: "Kubernetes", level: 4 },
      { label: "Terraform", level: 4 },
      { label: "CI/CD (GitHub Actions)", level: 4 },
      { label: "Azure", level: 3 },
    ],
  },
  {
    title: "IA & Machine Learning",
    skills: [
      { label: "Scikit-learn", level: 4 },
      { label: "Pandas / NumPy", level: 5 },
      { label: "Sistemas de Recomendação", level: 4 },
      { label: "NLP", level: 3 },
      { label: "LLM APIs", level: 4 },
    ],
  },
];

export interface Project {
  id: string;
  title: string;
  description: string;
  longDesc: string;
  tags: string[];
  image: string;
  github?: string;
  live?: string;
  featured?: boolean;
}

export const PROJECTS: Project[] = [
  {
    id: "cinerec",
    title: "CineRec — Sistema de Recomendação",
    description: "Plataforma de recomendação de filmes que combina Content-Based Filtering e Collaborative Filtering com interface cinematográfica moderna.",
    longDesc: "Sistema híbrido de recomendação usando Jaccard Similarity para filtragem por conteúdo e SVD (Matrix Factorization) via Scikit-Surprise para filtragem colaborativa, com dataset MovieLens 100K. Frontend construído em React + TypeScript com design dark cinematográfico.",
    tags: ["Python", "React", "Scikit-Surprise", "Machine Learning", "TMDB API"],
    image: "/CineRec.png",
    github: "https://github.com/GtxSantos/sistema-recomenda-filmes",
    featured: true,
  },
  {
    id: "ecommerce",
    title: "E-commerce Full Stack",
    description: "Plataforma de comércio eletrônico completa com autenticação JWT, gateway de pagamento, painel administrativo e deploy containerizado na AWS.",
    longDesc: "Backend em Python/FastAPI com PostgreSQL e Redis para cache. Frontend em React com gerenciamento de estado global. Infraestrutura na AWS com ECS Fargate, RDS e CloudFront. Pagamentos integrados via Stripe.",
    tags: ["Python", "FastAPI", "React", "AWS", "Docker", "PostgreSQL"],
    image: "https://i.imgur.com/luejhGf.png",
    github: "https://github.com/GtxSantos",
    featured: true,
  },
  {
    id: "analytics",
    title: "Dashboard de Analytics",
    description: "Dashboard interativo para monitoramento de métricas de negócio em tempo real, com gráficos dinâmicos, filtros e relatórios exportáveis.",
    longDesc: "Frontend em React com Recharts e TypeScript, consumindo uma API REST em FastAPI. Suporte a múltiplos data sources, filtros por período e exportação de relatórios em CSV/PDF. Deploy com Docker Compose.",
    tags: ["React", "TypeScript", "FastAPI", "Recharts", "Docker"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=450&fit=crop&auto=format",
    github: "https://github.com/GtxSantos",
  },
  {
    id: "cloud-infra",
    title: "Cloud Infrastructure as Code",
    description: "Infraestrutura multi-cloud completamente automatizada com Terraform, cobrindo ambientes de desenvolvimento, staging e produção na AWS e Azure.",
    longDesc: "Módulos Terraform reutilizáveis para VPC, EKS, RDS, S3 e CloudWatch na AWS, e equivalentes no Azure. Inclui blueprints de segurança com IAM roles, grupos de segurança e KMS. State management remoto com S3 + DynamoDB.",
    tags: ["Terraform", "AWS", "Azure", "Kubernetes", "IaC"],
    image: "https://i.imgur.com/fFRhfuB.png",
    github: "https://github.com/GtxSantos",
  },
  {
    id: "cicd",
    title: "CI/CD Pipeline Automatizado",
    description: "Pipeline de integração e entrega contínua com testes automatizados, análise de segurança, build de imagens Docker e deploy progressivo.",
    longDesc: "Workflows em GitHub Actions com matrix testing em múltiplas versões do Python, análise estática com Ruff e Bandit, SAST com CodeQL, e deploy com blue-green strategy no Kubernetes. Notificações via Slack.",
    tags: ["GitHub Actions", "Docker", "Kubernetes", "Python", "DevSecOps"],
    image: "https://i.imgur.com/Tp6KC1k.png",
    github: "https://github.com/GtxSantos",
  },
  {
    id: "microservices",
    title: "Arquitetura de Microsserviços",
    description: "Ecossistema de microsserviços com service mesh, observabilidade centralizada e comunicação assíncrona via mensageria.",
    longDesc: "Serviços independentes em Python/FastAPI comunicando via RabbitMQ para operações assíncronas e gRPC para chamadas síncronas. Observabilidade com Prometheus, Grafana e Jaeger para tracing distribuído. Orquestrado no Kubernetes com Istio.",
    tags: ["Python", "Docker", "Kubernetes", "RabbitMQ", "gRPC", "Istio"],
    image: "https://i.imgur.com/r7g2RGO.png",
    github: "https://github.com/GtxSantos",
  },
  {
    id: "api-rest",
    title: "API REST com FastAPI",
    description: "API de alta performance com autenticação OAuth2, documentação automática, rate limiting e deploy serverless.",
    longDesc: "API construída com FastAPI aproveitando tipagem nativa do Python e validação via Pydantic. Autenticação OAuth2 com JWT, refresh tokens e scopes. Testes de integração com pytest e httpx. Deploy na AWS Lambda com Mangum.",
    tags: ["Python", "FastAPI", "PostgreSQL", "AWS Lambda", "Docker"],
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=450&fit=crop&auto=format",
    github: "https://github.com/GtxSantos",
  },
  {
    id: "calculadora",
    title: "Calculadora Neumórfica",
    description: "Calculadora com identidade visual neumórfica, suporte a expressões matemáticas complexas e histórico de operações.",
    longDesc: "Interface com design neumórfico puro em CSS, com efeitos de luz e sombra para simular relevo. Suporte a operadores avançados, parênteses e histórico de cálculos. Animações de estado com CSS transitions.",
    tags: ["HTML", "CSS", "JavaScript", "Design System"],
    image: "https://github.com/GtxSantos/Calculadora/raw/main/Imagens/screenshot-projeto.png",
    github: "https://github.com/GtxSantos/Calculadora",
  },
];
