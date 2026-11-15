import type { ReactNode } from "react";
import { resumeDownloadName, resumeUrl } from "@/content/resume";

interface ResumeLinkProps {
  children: ReactNode;
  className?: string;
}

function ResumeLink({ children, className }: ResumeLinkProps) {
  return (
    <a className={className} download={resumeDownloadName} href={resumeUrl}>
      {children}
    </a>
  );
}

export default ResumeLink;
