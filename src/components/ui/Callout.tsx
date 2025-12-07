import { ReactNode } from "react";
import { Info, AlertTriangle, Lightbulb, AlertCircle, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

type CalloutType = 'info' | 'warning' | 'tip' | 'danger' | 'note';

interface CalloutProps {
  type?: CalloutType;
  title?: string;
  children: ReactNode;
}

const calloutConfig: Record<CalloutType, { 
  icon: ReactNode; 
  className: string; 
  defaultTitle: string;
  iconColor: string;
}> = {
  info: {
    icon: <Info className="h-5 w-5" />,
    className: "callout-info",
    defaultTitle: "Info",
    iconColor: "text-info",
  },
  warning: {
    icon: <AlertTriangle className="h-5 w-5" />,
    className: "callout-warning",
    defaultTitle: "Warning",
    iconColor: "text-warning",
  },
  tip: {
    icon: <Lightbulb className="h-5 w-5" />,
    className: "callout-tip",
    defaultTitle: "Tip",
    iconColor: "text-tip",
  },
  danger: {
    icon: <AlertCircle className="h-5 w-5" />,
    className: "callout-danger",
    defaultTitle: "Danger",
    iconColor: "text-danger",
  },
  note: {
    icon: <BookOpen className="h-5 w-5" />,
    className: "callout-info",
    defaultTitle: "Note",
    iconColor: "text-info",
  },
};

const Callout = ({ type = 'info', title, children }: CalloutProps) => {
  const config = calloutConfig[type];

  return (
    <div className={cn("callout flex gap-4", config.className)}>
      <div className={cn("shrink-0 mt-0.5", config.iconColor)}>
        {config.icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className={cn("font-semibold mb-1", config.iconColor)}>
          {title || config.defaultTitle}
        </p>
        <div className="text-foreground/90 leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Callout;
