import { z } from "zod";

export type UUID = string & { __uuid: true };

export function generateUUID(): string {
  // Verifica que `crypto.randomUUID` esté disponible en tu entorno
  if (typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  } else {
    // Alternativa en caso de que `crypto.randomUUID` no esté disponible
    return "xxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx".replace(/[x]/g, function (c) {
      const r = (Math.random() * 16) | 0,
        v = c === "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }
}

export function assertUUID(value: unknown): asserts value is UUID {
  if (!z.string().uuid().safeParse(value).success) {
    throw new TypeError("Invalid UUID");
  }
}
