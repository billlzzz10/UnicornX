Cleanup suggestions (automated migration performed):

- Removed root UI components moved to `packages/client/components/`:
  - `ai_chat_interface.tsx` -> `packages/client/components/AIChatInterface.tsx`
  - `document_upload.tsx` -> `packages/client/components/DocumentUpload.tsx`
  - `rag_dashboard.tsx` -> `packages/client/components/RAGDashboard.tsx`

- Keep only package-scoped components under `packages/client` so Next.js build uses correct tsconfig and node_modules.
- Recommended next manual steps (architect):
  1. From `packages/client` run `npm install` then `npm run dev` to verify frontend builds.
  2. From `packages/server` run `pip install -r requirements.txt` then `uvicorn main:app --reload` to validate backend.
  3. Configure `.env` from `.env.example` and secure secrets (do not commit keys).
