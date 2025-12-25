# Guia de Deploy para Hospedagem Compartilhada

## Pré-requisitos

- Node.js 18+ instalado
- npm ou bun instalado
- Acesso FTP/SFTP à hospedagem

## Passo 1: Configurar para Modo Mock (sem banco de dados)

Para usar autenticação mockada (localStorage), edite o `src/App.tsx`:

```tsx
// Trocar isso:
import { AuthProvider } from '@/contexts/AuthContext';

// Por isso:
import { MockAuthProvider as AuthProvider } from '@/contexts/MockAuthContext';
```

E nas páginas de recuperação de senha, use as versões Mock:
- `ForgotPasswordMock` ao invés de `ForgotPassword`
- `ResetPasswordMock` ao invés de `ResetPassword`

## Passo 2: Gerar Build de Produção

```bash
# Instalar dependências
npm install

# Gerar build otimizado
npm run build
```

Isso criará a pasta `dist/` com todos os arquivos estáticos.

## Passo 3: Upload para Hospedagem

1. **Via FTP/SFTP:**
   - Conecte ao servidor usando FileZilla ou similar
   - Navegue até a pasta `public_html` (ou `www`, `htdocs`)
   - Faça upload de **todo o conteúdo** da pasta `dist/`

2. **Via cPanel File Manager:**
   - Acesse o cPanel
   - Vá em "File Manager"
   - Navegue até `public_html`
   - Faça upload dos arquivos da pasta `dist/`

## Passo 4: Configurar .htaccess

O arquivo `.htaccess` já está incluído na pasta `public/` e será copiado para `dist/` no build.

Se não aparecer, crie o arquivo `.htaccess` na raiz do site com:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule ^ index.html [L]
</IfModule>
```

## Estrutura Final no Servidor

```
public_html/
├── .htaccess
├── index.html
├── favicon.png
├── robots.txt
└── assets/
    ├── index-[hash].js
    ├── index-[hash].css
    └── ... (imagens e fontes)
```

## Funcionalidades no Modo Mock

✅ **Funciona:**
- Página inicial completa com animações
- Login/cadastro (dados salvos no navegador)
- Troca de tema claro/escuro
- Todas as animações e efeitos visuais
- Navegação entre páginas

⚠️ **Limitações (sem backend):**
- Usuários são salvos apenas no navegador local
- Cada navegador/dispositivo tem seus próprios usuários
- Recuperação de senha é apenas visual (não envia email real)

## Adicionando Backend Depois

Quando quiser adicionar um backend real:

1. Configure um projeto Supabase
2. Restaure os imports originais:
   ```tsx
   import { AuthProvider } from '@/contexts/AuthContext';
   ```
3. Configure as variáveis de ambiente no `.env`
4. Faça novo build e upload

## Solução de Problemas

### Página em branco
- Verifique se o `.htaccess` está no servidor
- Verifique se `mod_rewrite` está habilitado

### Rotas não funcionam
- Confirme que o `.htaccess` foi enviado
- Tente acessar diretamente: `seusite.com/index.html`

### CSS/JS não carrega
- Verifique se todos os arquivos da pasta `assets/` foram enviados
- Limpe o cache do navegador

## Dependências do Projeto

```json
{
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "react-router-dom": "^6.30.1",
  "react-helmet-async": "^2.0.5",
  "next-themes": "^0.3.0",
  "lucide-react": "^0.462.0",
  "zod": "^3.25.76",
  "clsx": "^2.1.1",
  "tailwind-merge": "^2.6.0",
  "sonner": "^1.7.4",
  "gsap": "^3.14.2",
  "@radix-ui/react-accordion": "^1.2.11",
  "@radix-ui/react-toast": "^1.2.14",
  "@radix-ui/react-slot": "^1.2.3",
  "class-variance-authority": "^0.7.1"
}
```
