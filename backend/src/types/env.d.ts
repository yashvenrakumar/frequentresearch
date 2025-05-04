// types/env.d.ts
declare namespace NodeJS {
    interface ProcessEnv {
      MAIL_HOST: string;
      MAIL_USER: string;
      MAIL_PASS: string;
      MAIL_FROM: string;
    }
  }
  