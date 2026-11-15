export const resumeDownloadName = "Shivansh-Shukla-Resume.pdf";
export const resumeUrl = `${import.meta.env.BASE_URL}resume.pdf`;

export function downloadResume() {
  const link = document.createElement("a");
  link.href = resumeUrl;
  link.download = resumeDownloadName;
  document.body.append(link);
  link.click();
  link.remove();
}

export function formatResumeUpdatedAt(value: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}
