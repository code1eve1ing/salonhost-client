import Script from "./Script";
interface TemplateRendererProps {
  html: string,
  css: string,
  js: string
}

export default function TemplateRenderer({
  html,
  css,
  js
}: TemplateRendererProps) {
  return <>
    <style dangerouslySetInnerHTML={{ __html: css }} />
    <div
      dangerouslySetInnerHTML={{
        __html: html,
      }}
    />
    <Script js={js}/>
  </>
}