import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import "./theme-config.css";

export function Providers({ children }: { children: React.ReactNode }) {
  return <Theme appearance="dark">{children}</Theme>;
}
