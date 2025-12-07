import { Highlight, themes } from "prism-react-renderer";
import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
  showLineNumbers?: boolean;
}

const CodeBlock = ({ 
  code, 
  language = "python", 
  title,
  showLineNumbers = true 
}: CodeBlockProps) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="group relative mb-6 rounded-lg border border-border overflow-hidden bg-secondary">
      {/* Header */}
      {title && (
        <div className="flex items-center justify-between border-b border-border bg-muted/50 px-4 py-2">
          <span className="text-sm font-medium text-muted-foreground">{title}</span>
          <span className="text-xs text-muted-foreground uppercase">{language}</span>
        </div>
      )}
      
      {/* Copy Button */}
      <button
        onClick={copyToClipboard}
        className={cn(
          "absolute top-2 right-2 p-2 rounded-md transition-all",
          "bg-muted/80 hover:bg-muted text-muted-foreground hover:text-foreground",
          "opacity-0 group-hover:opacity-100",
          title && "top-12"
        )}
        aria-label="Copy code"
      >
        {copied ? (
          <Check className="h-4 w-4 text-tip" />
        ) : (
          <Copy className="h-4 w-4" />
        )}
      </button>

      {/* Code */}
      <Highlight theme={themes.nightOwl} code={code.trim()} language={language}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre
            className={cn(className, "overflow-x-auto p-4 text-sm leading-relaxed")}
            style={{ ...style, background: 'transparent', margin: 0 }}
          >
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })} className="table-row">
                {showLineNumbers && (
                  <span className="table-cell pr-4 text-right text-muted-foreground/50 select-none w-8">
                    {i + 1}
                  </span>
                )}
                <span className="table-cell">
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token })} />
                  ))}
                </span>
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  );
};

export default CodeBlock;
